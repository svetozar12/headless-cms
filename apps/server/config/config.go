package config

import (
	"log"

	"github.com/joho/godotenv"
)

// Load load config
func Load() error {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	return nil
}
