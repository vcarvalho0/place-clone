package server

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	redis "place-service/config"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

type Client struct {
	conn *websocket.Conn
}

type PixelBroadcast struct {
	clients map[*Client]bool
}

func BroadcastServer() *PixelBroadcast {
	return &PixelBroadcast{
		clients: make(map[*Client]bool),
	}
}

func (s *PixelBroadcast) serverWs(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
		return
	}

	client := &Client{conn: conn}
	s.clients[client] = true

	defer func() {
		delete(s.clients, client)
		conn.Close()
	}()

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseNormalClosure) {
				log.Fatal("Unexpected WebSocket error: ", err)
			}
			break
		}

		var pixel redis.Pixel
		err = json.Unmarshal(message, &pixel)
		if err != nil {
			log.Printf("JSON pixel parsing error: %s", err)
			continue
		}

		err = redis.SavePixel(pixel)
		if err != nil {
			log.Printf("Error while trying to save the pixels in database: %s", err)
			continue
		}

		s.broadcastPixel(message, client)
	}
}

func (s *PixelBroadcast) broadcastPixel(message []byte, sender *Client) {
	for client := range s.clients {
		if client != sender {
			err := client.conn.WriteMessage(websocket.TextMessage, message)
			if err != nil {
				log.Fatal("Error while trying to broadcast the pixels to client: ", err)
				client.conn.Close()
				delete(s.clients, client)
			}
		}
	}
}

func retrieveBoardState(w http.ResponseWriter, r *http.Request) {
	pixels, err := redis.GetAllPixels()
	if err != nil {
		http.Error(w, "Error while trying to retrieve the board state", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(pixels)
}

func StartServer(addr string) {
	broadcastServer := BroadcastServer()

	mux := http.NewServeMux()
	mux.HandleFunc("/ws", broadcastServer.serverWs)
	mux.HandleFunc("/board", retrieveBoardState)

	handler := CorsMiddleware(mux)

	log.Printf("Server started on address %s", addr)

	if os.Getenv("ENV") != "production" {
		err := http.ListenAndServe(addr, handler)
		if err != nil {
			log.Fatal("Something happened while trying to start the server: ", err)
		}
	} else {
		err := http.ListenAndServeTLS(addr, "server.crt", "server.key", handler)
		if err != nil {
			log.Fatal("Something happened while trying to start the server: ", err)
		}
	}
}
