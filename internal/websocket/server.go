package websocket

import (
	"encoding/json"
	"log"

	"github.com/gorilla/websocket"
)

func (s *Server) Send(conn *websocket.Conn, message string) {
	conn.WriteMessage(websocket.TextMessage, []byte(message))
}

func (s *Server) ProcessMessage(conn *websocket.Conn, msg []byte) {
	var tile Tile
	if err := json.Unmarshal(msg, &tile); err != nil {
		log.Printf("Error parsing json data: %v", err)
	}

	err := s.rdb.SetTileInBoard(tile.X, tile.Y, tile.Color)
	if err != nil {
		log.Printf("Error while trying to set the new tile: %v", err)
	}

	s.broadcast <- msg
}
