package models

type FieldTypeBody struct {
	Name           string `json:"name" binding:"required"`
	FieldType      string `json:"fieldType"`
	ContentModelId uint   `json:"contentModelId" binding:"required" gorm:"column:content_model_id"`
}

type FieldType struct {
	Model
	FieldTypeBody
}
