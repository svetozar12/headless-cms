package contentmodel

import (
	"svetozar12/headless-cms-be/db"
	contentmodel "svetozar12/headless-cms-be/db/models/contentModel"

	"github.com/gofiber/fiber/v2"
)

func ContentModelRoutes(app fiber.Router) {
	contentModel := app.Group("/contentModel")
	contentModel.Get("/", getContentModel)
	contentModel.Post("/", createContentModel)
	contentModel.Put("/:id", updateContentModel)
	contentModel.Delete("/:id", deleteContentModel)
}

func getContentModel(c *fiber.Ctx) error {
	var contentModels []contentmodel.ContentModel
	db.DB.Find(&contentModels)
	return c.Status(fiber.StatusOK).JSON(contentModels)
}

func createContentModel(c *fiber.Ctx) error {
	body := new(contentmodel.ContentModel)
	err := c.BodyParser(body)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)
	}
	db.DB.Create(&body)

	return c.Status(fiber.StatusCreated).JSON(body)
}

func updateContentModel(c *fiber.Ctx) error {
	id := c.Params("id")
	contentModel := new(contentmodel.ContentModel)
	err := c.BodyParser(contentModel)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)
	}
	db.DB.Where("id = ?", id).Updates(&contentModel)
	return c.Status(fiber.StatusOK).JSON(contentModel)
}

func deleteContentModel(c *fiber.Ctx) error {
	id := c.Params("id")
	var contentModel contentmodel.ContentModel
	result := db.DB.Delete(&contentModel, id)
	if result.RowsAffected == 0 {
		return c.SendStatus(fiber.StatusNotFound)
	}
	return c.SendStatus(fiber.StatusOK)
}
