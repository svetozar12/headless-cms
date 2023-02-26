package contentModel

import (
	"github.com/gofiber/fiber/v2"
)

func ContentModelRoutes(app fiber.Router) {
	contentModel := app.Group("/contentModel")
	contentModel.Get("/:id", getContentModelById)
	contentModel.Get("/", getContentModel)
	contentModel.Post("/", createContentModel)
	contentModel.Put("/:id", updateContentModel)
	contentModel.Delete("/:id", deleteContentModel)
}
