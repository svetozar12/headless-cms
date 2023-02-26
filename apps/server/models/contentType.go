package models

type ContentTypeBody struct {
	Name        string `json:"name" binding:"required"`
	UserId      string `json:"userId" binding:"required"`
	Description string `json:"description"`
}

type ContentType struct {
	Model
	ContentTypeBody
	FieldTypes  []FieldType `gorm:"foreignKey:ContentModelId;constraint:OnDelete:CASCADE;" json:"fieldTypes" binding:"required"`
	ContentList []Content   `gorm:"foreignKey:ModelId;constraint:OnDelete:CASCADE;" json:"contentList" binding:"required"`
}
