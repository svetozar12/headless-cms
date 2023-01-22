package field

import (
	"svetozar12/headless-cms-be/db"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Field struct {
	gorm.Model
	Name      string `json:"name"`
	Value     string `json:"value"`
	TypeId    int    `json:"typeId"`
	ContentId int    `json:"contentId"`
}

func FieldRoutes(app fiber.Router) {
	field := app.Group("/field")
	field.Get("/", getFields)
	field.Post("/", createField)
	field.Put("/:id", updateField)
	field.Delete("/:id", deleteField)
}

func getFields(c *fiber.Ctx) error {
	var fields []Field
	db.DB.Find(&fields)
	return c.Status(fiber.StatusOK).JSON(fields)
}

func createField(c *fiber.Ctx) error {
	field := new(Field)
	err := c.BodyParser(field)
	if err != nil {
		return c.SendStatus(fiber.ErrUnprocessableEntity.Code)
	}
	db.DB.Create(&field)
	return c.Status(fiber.StatusCreated).JSON(&field)
}

func updateField(c *fiber.Ctx) error {
	id := c.Params("id")
	field := new(Field)
	err := c.BodyParser(field)
	if err != nil {
		return c.SendStatus(fiber.ErrUnprocessableEntity.Code)
	}
	db.DB.Where("id = ?", id).Where("content_id = ?", field.ContentId).Updates(&field)
	return c.Status(fiber.StatusOK).JSON(field)
}

func deleteField(c *fiber.Ctx) error {
	id := c.Params("id")
	var field Field
	db.DB.Delete(&field, id)
	return c.SendStatus(fiber.StatusOK)
}
