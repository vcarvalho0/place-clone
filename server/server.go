package server

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

type Pixel struct {
	PosX  uint   `json:"x"`
	PosY  uint   `json:"y"`
	Color string `json:"color"`
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
				log.Printf("Unexpected WebSocket error: %v: ", err)
			} else {
				log.Printf("WebSocket connection closed: %v: ", err)
			}
			break
		}

		var pixel Pixel
		err = json.Unmarshal(message, &pixel)
		if err != nil {
			log.Fatal("JSON pixel parsing error: ", err)
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

func StartServer(addr string) {
	broadcastServer := BroadcastServer()

	http.HandleFunc("/ws", broadcastServer.serverWs)

	log.Printf("Server started on address %s", addr)
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		log.Fatal("Something wrong happened: ", err)
	}
}
