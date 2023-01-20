package routes

import "github.com/gofiber/fiber/v2"

func InitRoutes(app *fiber.App) {
	v1 := app.Group("/v1")
	v1.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello from the api")
	})
}
