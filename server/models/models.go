package models

import (
	"time"

	"gorm.io/gorm"
)

type Model struct {
	ID        uint           `gorm:"primarykey" json:"id" binding:"required"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}

type PaginationModel struct {
	Data       interface{} `json:"data"`
	Pagination struct {
		Total  int `json:"total"`
		Offset int `json:offSet`
		Limit  int `json:limit`
	}
}
