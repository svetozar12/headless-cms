package contentmodel

import (
	"svetozar12/headless-cms-be/db"

	"gorm.io/gorm"
)

type ContentModel struct {
	gorm.Model
	Name   string `json:"name"`
	UserId int    `json:"userId"`
}

func GetAll() ([]ContentModel, error) {
	var contentModel []ContentModel
	err := db.DB.Model(&ContentModel{}).Preload("fieldTypeIds").Find(contentModel).Error
	return contentModel, err
}
