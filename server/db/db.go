package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Open() {
	var err error
	DB, err = gorm.Open(postgres.Open("postgresql://postgres:dnU1NO0H4eyNSrXDx24p@containers-us-west-95.railway.app:6312/railway"), &gorm.Config{DisableForeignKeyConstraintWhenMigrating: true})
	if err != nil {
		panic(err)
	}
}
