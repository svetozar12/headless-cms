package routes

import (
	"svetozar12/headless-cms-be/config"
	content "svetozar12/headless-cms-be/routes/content"
	contentmodel "svetozar12/headless-cms-be/routes/contentModel"
	"svetozar12/headless-cms-be/routes/field"
	fieldtype "svetozar12/headless-cms-be/routes/fieldType"

	"github.com/gofiber/fiber/v2"
)

func InitRoutes(app *fiber.App) {
	config.Init()
	v1 := app.Group("/v1")
	v1.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello from the api")
	})
	fieldtype.FieldType(v1)
	contentmodel.ContentModelRoutes(v1)
	content.ContentRoutes(v1)
	field.FieldRoutes(v1)
}
