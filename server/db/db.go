package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Open() {
	var err error
	DB, err = gorm.Open(postgres.Open("postgresql://postgres:LJ6dqn24tfQd1WZHwSX5@containers-us-west-193.railway.app:7114/railway"), &gorm.Config{DisableForeignKeyConstraintWhenMigrating: true})
	if err != nil {
		panic(err)
	}
}
