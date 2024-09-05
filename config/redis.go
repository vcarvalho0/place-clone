package redis

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/redis/go-redis/v9"
)

func ConnectRedis() *redis.Client {
	redisAddr, ok := os.LookupEnv("REDIS")
	if !ok {
		log.Fatalf("Missing REDIS environment variable")
	}
	redisPassword, ok := os.LookupEnv("REDIS_PASSWORD")
	if !ok {
		log.Fatalf("Missing REDIS_PASSWORD environment variable")
	}

	client := redis.NewClient(&redis.Options{
		Addr:     redisAddr,
		Password: redisPassword,
		DB:       0,
	})

	return client
}

type Pixel struct {
	PosX  uint   `json:"x"`
	PosY  uint   `json:"y"`
	Color string `json:"color"`
}

func SavePixel(pixel Pixel) error {
	client := ConnectRedis()

	key := fmt.Sprintf("pixel:%d:%d", pixel.PosX, pixel.PosY)
	value, err := json.Marshal(pixel)
	if err != nil {
		return err
	}

	return client.Set(context.Background(), key, value, 0).Err()
}

func GetAllPixels() ([]Pixel, error) {
	client := ConnectRedis()

	keys, err := client.Keys(context.Background(), "pixel:*").Result()
	if err != nil {
		return nil, err
	}

	var pixels []Pixel

	for _, key := range keys {
		value, err := client.Get(context.Background(), key).Result()
		if err != nil {
			return nil, err
		}

		var pixel Pixel
		err = json.Unmarshal([]byte(value), &pixel)
		if err != nil {
			return nil, err
		}

		pixels = append(pixels, pixel)
	}

	return pixels, nil
}
