package types

import (
	"svetozar12/headless-cms-be/routes/content"
)

type ContentList struct {
	Content []content.Content `gorm:"foreignKey:ModelId;constraint:OnDelete:CASCADE;" json:"fieldTypes"`
}
