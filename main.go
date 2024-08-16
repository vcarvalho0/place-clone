package main

import (
	server "place-service/src"
)

func main() {
	s := &server.Server{}
	s.Start("localhost:8080")
}
