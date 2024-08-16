package server

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Server struct {
	Router *gin.Engine
}

func (s *Server) RouterSetup() *gin.Engine {
	router := gin.Default()

	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "OK"})
	})

	return router
}

func (s *Server) Start(addr string) {
	router := s.RouterSetup()

	router.Run(addr)
}
