package server

import (
	"net/http"
	"place-service/redis"
)

func RetrieveBitmap(w http.ResponseWriter, r *http.Request, rdb *redis.Redis) {
	bitmap, err := rdb.GetBoard()
	if err != nil {
		http.Error(w, "Error while trying to retrieve the bitmap state", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/octet-stream")
	w.Write(bitmap)
}
