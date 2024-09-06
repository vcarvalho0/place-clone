package redis

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/redis/go-redis/v9"
)

func ConnectRedis() *redis.Client {
	opt, err := redis.ParseURL(os.Getenv("REDIS_URL"))
	if err != nil {
		panic(err)
	}

	client := redis.NewClient(opt)
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
