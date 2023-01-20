package config

import (
	"svetozar12/headless-cms-be/db"
	fieldtype "svetozar12/headless-cms-be/routes/fieldType"
)

func Init() {
	db.DB.AutoMigrate(&fieldtype.FieldTypes{})
}
