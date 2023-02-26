package db

import (
	"os"
	"svetozar12/headless-cms-be/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Open() {
	var err error
	DB, err = gorm.Open(postgres.Open(os.Getenv("DB_URL")), &gorm.Config{DisableForeignKeyConstraintWhenMigrating: true})
	if err != nil {
		panic(err)
	}
	DB.AutoMigrate(&models.ContentType{})
	DB.AutoMigrate(&models.FieldType{}, &models.Field{}, &models.Content{})
}
