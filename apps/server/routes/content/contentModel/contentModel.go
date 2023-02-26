package contentModel

import "svetozar12/headless-cms-be/models"

type Body struct {
	Name    string `json:"name" binding:"required"`
	ModelId int    `json:"modelId" binding:"required" gorm:"column:content_model_id"`
	UserId  string `json:"userId" binding:"required"`
}

type Content struct {
	models.Model
	Body
}
