package config

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectToDB() *gorm.DB {
	var err error
	dsn, ok := os.LookupEnv("DB_DSN")
	if !ok {
		log.Fatal("Missing DB_DSN in env file")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error connecting to database, Error: ", &err)
	}

	return db
}
