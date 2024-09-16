package redis

import (
	"os"

	"github.com/redis/go-redis/v9"
)

type Redis struct {
	*redis.Client
}

func Connect() (*Redis, error) {
	opt, err := redis.ParseURL(os.Getenv("REDIS_URL"))
	if err != nil {
		panic(err)
	}

	rdb := redis.NewClient(opt)
	client := &Redis{rdb}

	return client, nil
}
