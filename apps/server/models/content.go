package models

type ContentBody struct {
	Name    string `json:"name" binding:"required"`
	ModelId int    `json:"modelId" binding:"required" gorm:"column:content_model_id"`
	UserId  string `json:"userId" binding:"required"`
}

type Content struct {
	Model
	ContentBody
	FieldList []Field `gorm:"foreignKey:ContentId;constraint:OnDelete:CASCADE;" json:"fieldList" binding:"required"`
}
