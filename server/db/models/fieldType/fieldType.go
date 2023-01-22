package fieldtype

import (
	"gorm.io/gorm"
)

type FieldTypes struct {
	gorm.Model
	Name           string `json:"name"`
	FieldType      string `json:"fieldType"`
	ContentModelId int    `json:"contentModelId"`
}
