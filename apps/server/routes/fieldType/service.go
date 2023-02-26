package fieldType

import (
	"github.com/gofiber/fiber/v2"
)

func FieldTypeRoutes(app fiber.Router) {
	fieldType := app.Group("/fieldType")
	fieldType.Get("/", getFieldTypes)
	fieldType.Post("/", createFieldType)
	fieldType.Put("/:id", updateFieldType)
	fieldType.Delete("/:id", deleteFieldType)
}
