package config

import (
	"svetozar12/headless-cms-be/db"
	"svetozar12/headless-cms-be/routes/content/contentModel"
	"svetozar12/headless-cms-be/routes/contentModel/contentTypeModel"
	"svetozar12/headless-cms-be/routes/field"
	fieldtype "svetozar12/headless-cms-be/routes/fieldType"
)

func Init() {
	db.DB.AutoMigrate(&contentTypeModel.ContentModel{})
	db.DB.AutoMigrate(&fieldtype.FieldType{}, &field.Field{}, &contentModel.Content{})
}
