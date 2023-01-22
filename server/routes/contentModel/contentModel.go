package contentmodel

import (
	"svetozar12/headless-cms-be/db"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type ContentModel struct {
	gorm.Model
	Name   string `json:"name"`
	UserId int    `json:"userId"`
}

func ContentModelRoutes(app fiber.Router) {
	contentModel := app.Group("/contentModel")
	contentModel.Get("/", getContentModel)
	contentModel.Post("/", createContentModel)
	contentModel.Put("/:id", updateContentModel)
	contentModel.Delete("/:id", deleteContentModel)
}

func getContentModel(c *fiber.Ctx) error {
	var contentModels []ContentModel
	db.DB.Find(&contentModels)
	return c.Status(fiber.StatusOK).JSON(contentModels)
}

func createContentModel(c *fiber.Ctx) error {
	contentModel := new(ContentModel)
	err := c.BodyParser(contentModel)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)
	}
	db.DB.Create(&contentModel)

	return c.Status(fiber.StatusCreated).JSON(contentModel)
}

func updateContentModel(c *fiber.Ctx) error {
	id := c.Params("id")
	contentModel := new(ContentModel)
	err := c.BodyParser(contentModel)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)
	}
	db.DB.Where("id = ?", id).Updates(&contentModel)
	return c.Status(fiber.StatusOK).JSON(contentModel)
}

func deleteContentModel(c *fiber.Ctx) error {
	id := c.Params("id")
	var contentModel ContentModel
	result := db.DB.Delete(&contentModel, id)
	if result.RowsAffected == 0 {
		return c.SendStatus(fiber.StatusNotFound)
	}
	return c.SendStatus(fiber.StatusOK)
}
