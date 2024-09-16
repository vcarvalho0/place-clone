package websocket

import (
	"place-service/redis"

	"github.com/gorilla/websocket"
)

type Server struct {
	clients   map[*websocket.Conn]bool
	broadcast chan []byte
	rdb       *redis.Redis
}

type Tile struct {
	X     int   `json:"x"`
	Y     int   `json:"y"`
	Color uint8 `json:"color"`
}
