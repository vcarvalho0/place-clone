package websocket

import (
	"log"
	"net/http"
	"place-service/redis"

	"github.com/gorilla/websocket"
)

const (
	readBufferSize  = 1024
	writeBufferSize = 1024
	maxMessageSize  = 512
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  readBufferSize,
	WriteBufferSize: writeBufferSize,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func NewServer(rdb *redis.Redis) *Server {
	return &Server{
		clients:   make(map[*websocket.Conn]bool),
		broadcast: make(chan []byte),
		rdb:       rdb,
	}
}

func (s *Server) HandlerWS(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("failed upgrading connection"))
		return
	}

	s.clients[conn] = true

	defer func() {
		conn.Close()
		delete(s.clients, conn)
	}()

	done := make(chan struct{})

	go s.writePump()
	s.readPump(conn, done)
}

func (s *Server) readPump(conn *websocket.Conn, done chan<- struct{}) {
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Fatal("Unexpected websocket error: ", err)
			}
			close(done)
			break
		}

		s.ProcessMessage(conn, msg)
	}
}

func (s *Server) writePump() {
	for {
		msg := <-s.broadcast
		for client := range s.clients {
			err := client.WriteMessage(websocket.TextMessage, msg)
			if err != nil {
				log.Printf("Error while trying to broadcast data to other clients: %v", err)
				client.Close()
				delete(s.clients, client)
			}
		}
	}
}
