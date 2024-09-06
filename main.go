package main

import (
	"log"
	"os"
	"place-service/server"

	"github.com/joho/godotenv"
)

func main() {
	if os.Getenv("ENV") != "production" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	port, ok := os.LookupEnv("PORT")
	server.StartServer(port)
	if !ok {
		log.Fatal("Missing server address in env file")
	}
}
