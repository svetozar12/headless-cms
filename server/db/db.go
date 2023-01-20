package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Open() {
	var err error
	DB, err = gorm.Open(postgres.Open("postgresql://postgres:eI78CKrbpN6yDqqwxUZs@containers-us-west-114.railway.app:6886/railway"))
	if err != nil {
		panic(err)
	}
}
