package routes

import (
	_ "svetozar12/headless-cms-be/docs"
	"svetozar12/headless-cms-be/routes/auth/github"
	"svetozar12/headless-cms-be/routes/content"
	"svetozar12/headless-cms-be/routes/contentModel"
	"svetozar12/headless-cms-be/routes/field"
	"svetozar12/headless-cms-be/routes/fieldType"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
)

// @title Fiber Example API
// @version 1.0
// @description This is a sample swagger for Fiber
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email fiber@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host localhost:4000
// @BasePath /
func InitRoutes(app *fiber.App) {
	v1 := app.Group("/v1")
	v1.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello from the api")
	})
	v1.Get("/swagger/*", swagger.HandlerDefault) // default
	fieldType.FieldTypeRoutes(v1)
	contentModel.ContentModelRoutes(v1)
	content.ContentRoutes(v1)
	field.FieldRoutes(v1)
	github.AuthGithubRoutes(v1)
}
