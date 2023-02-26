package models

type FieldBody struct {
	Name      string `json:"name" binding:"required"`
	Value     string `json:"value"`
	TypeId    int    `json:"typeId" binding:"required"`
	ContentId int    `json:"contentId" binding:"required"`
}

type Field struct {
	Model
	FieldBody
	FieldType FieldType `gorm:"foreignKey:TypeId" json:"fieldType" binding:"required"`
}
