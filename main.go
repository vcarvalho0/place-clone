package main

import (
	"log"
	"os"
	"place-service/server"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	addr, ok := os.LookupEnv("SERVER_ADDRESS")
	if !ok {
		log.Fatal("Missing server address in env file")
	}

	s := server.Server{}
	s.Start(addr)
}
