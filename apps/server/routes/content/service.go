package content

import (
	"github.com/gofiber/fiber/v2"
)

func ContentRoutes(app fiber.Router) {
	content := app.Group("/content")
	content.Get("/:id", GetContentById)
	content.Get("/", GetContent)
	content.Post("/", CreateContent)
	content.Put("/:id", UpdateContent)
	content.Delete("/:id", DeleteContent)
}
