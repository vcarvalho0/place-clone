package redis

import (
	"context"
	"log"
)

var (
	CANVAS_WIDTH  = 1000
	CANVAS_HEIGHT = 1000
	BITS_PER_SIZE = 5
)

var ctx = context.Background()

func (r *Redis) SetTileInBoard(x, y int, color uint8) error {
	if x < 0 || x >= CANVAS_WIDTH || y < 0 || y >= CANVAS_HEIGHT || color >= 32 {
		log.Printf("Invalid pixel coordinates or color")
	}

	offset := (x + CANVAS_WIDTH*y) * BITS_PER_SIZE
	_, err := r.BitField(ctx, "place:board_bitmap", "SET", "u5", offset, color).Result()
	if err != nil {
		log.Printf("Error while trying to set the tile in board %s", err)
	}

	return err
}

func (r *Redis) GetBoard() ([]byte, error) {
	bytes, err := r.Get(ctx, "place:board_bitmap").Bytes()
	if err != nil {
		log.Printf("Error while trying to fetch the board %s", err)
	}

	offset := CANVAS_WIDTH * CANVAS_HEIGHT
	if len(bytes) != offset {
		log.Printf("Retrieved board size (%d bytes) doesn't match expected size (%d bytes)", len(bytes), offset)
	}

	return bytes, err
}

func (r *Redis) GetTile(x, y int) (uint8, error) {
	if x < 0 || x >= CANVAS_WIDTH || y < 0 || y >= CANVAS_HEIGHT {
		log.Printf("Invalid coordinates")
	}

	offset := (x + CANVAS_WIDTH*y) * BITS_PER_SIZE
	result, err := r.BitField(ctx, "place:board_bitmap", "GET", "u5", offset).Result()
	if err != nil {
		log.Printf("Error fetching tile color: %v", err)
	}

	color := uint8(result[0])

	return color, nil
}

func (r *Redis) initializeBoard() error {
	bytesNeeded := CANVAS_WIDTH * CANVAS_HEIGHT

	board := make([]byte, bytesNeeded)
	for i := range board {
		board[i] = 0xFF
	}

	_, err := r.Set(ctx, "place:board_bitmap", board, 0).Result()
	if err != nil {
		log.Printf("Error while initializing the board %s", err)
		return err
	}

	log.Print("Board initialized")
	return nil
}

func (r *Redis) DoesBoardExist() error {
	exists, err := r.Exists(ctx, "place:board_bitmap").Result()
	if err != nil {
		log.Printf("Error checking if board exist: %v", err)
		return err
	}

	if exists == 0 {
		log.Printf("Board doesn't exist, creating a new one")
		return r.initializeBoard()
	}

	log.Printf("Found board")
	return nil
}
