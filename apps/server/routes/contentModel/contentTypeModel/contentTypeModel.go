package contentTypeModel

import (
	"svetozar12/headless-cms-be/models"
	"svetozar12/headless-cms-be/routes/content/contentModel"
	fieldtype "svetozar12/headless-cms-be/routes/fieldType"
)

type Body struct {
	Name        string `json:"name" binding:"required"`
	UserId      string `json:"userId" binding:"required"`
	Description string `json:"description"`
}

type ContentModel struct {
	models.Model
	Body
	FieldTypes []fieldtype.FieldType `gorm:"foreignKey:ContentModelId;constraint:OnDelete:CASCADE;" json:"fieldTypes" binding:"required"`
	contentModel.Content
}
