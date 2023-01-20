package fieldtype

import (
	"svetozar12/headless-cms-be/db"

	"github.com/gofiber/fiber/v2"
)

type FieldTypes struct {
	id   int
	name string
	// fieldTypeIds []int
}

func FieldType(app fiber.Router) {
	fieldType := app.Group("/fieldType")
	fieldType.Get("/", getFieldType)
}

func getFieldType(c *fiber.Ctx) error {
	var fieldTypes []FieldTypes
	db.DB.Find(&fieldTypes)
	return c.SendString("get field type")
}
