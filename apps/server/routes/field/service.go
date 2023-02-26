package field

import (
	"github.com/gofiber/fiber/v2"
)

func FieldRoutes(app fiber.Router) {
	field := app.Group("/field")
	field.Get("/:id", getFieldById)
	field.Get("/", getFields)
	field.Post("/", createField)
	field.Put("/:id", updateField)
	field.Delete("/:id", deleteField)
}
