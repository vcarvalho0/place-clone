package server

import (
	"log"
	"net/http"
	"place-service/internal/websocket"
	"place-service/redis"
)

func addRoutes(mux *http.ServeMux, rdb *redis.Redis) {
	server := websocket.NewServer(rdb)

	mux.HandleFunc("/api/v1/draw", server.HandlerWS)
	mux.Handle("/api/v1/bitmap", Cors(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		RetrieveBitmap(w, r, rdb)
	})))
}

func StartServer(addr string) {
	redis, err := redis.Connect()
	if err != nil {
		log.Fatal("Error trying to connect to redis server")
	}

	// Check if board exist, if not create a new one
	redis.DoesBoardExist()

	mux := http.NewServeMux()
	addRoutes(mux, redis)

	log.Printf("Server started on address %s", addr)
	err = http.ListenAndServe(addr, mux)
	if err != nil {
		log.Fatal("Something happened while trying to start the server: ", err)
	}
}
