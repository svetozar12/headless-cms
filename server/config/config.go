package config

import (
	"svetozar12/headless-cms-be/db"
	contentmodel "svetozar12/headless-cms-be/db/models/contentModel"
	fieldtype "svetozar12/headless-cms-be/db/models/fieldType"
)

func Init() {
	db.DB.AutoMigrate(&fieldtype.FieldTypes{}, &contentmodel.ContentModel{})
}
