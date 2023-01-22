package fieldtype

import (
	"svetozar12/headless-cms-be/db"
	fieldtype "svetozar12/headless-cms-be/db/models/fieldType"

	"github.com/gofiber/fiber/v2"
)

func FieldType(app fiber.Router) {
	fieldType := app.Group("/fieldType")
	fieldType.Get("/", getFieldType)
	fieldType.Post("/", createFieldType)
	fieldType.Put("/:id", updateFieldType)
	fieldType.Delete("/:id", deleteFieldType)
}

func getFieldType(c *fiber.Ctx) error {
	var fieldTypes []fieldtype.FieldTypes
	db.DB.Find(&fieldTypes)
	return c.Status(fiber.StatusOK).JSON(fieldTypes)
}

func createFieldType(c *fiber.Ctx) error {
	fieldType := new(fieldtype.FieldTypes)
	err := c.BodyParser(fieldType)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)
	}
	db.DB.Create(&fieldType)
	return c.Status(fiber.StatusCreated).JSON(fieldType)
}

func updateFieldType(c *fiber.Ctx) error {
	fieldType := new(fieldtype.FieldTypes)
	id := c.Params("id")
	err := c.BodyParser(fieldType)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)

	}
	db.DB.Where("id = ?", id).Updates(&fieldType)
	return c.Status(fiber.StatusOK).JSON(fieldType)
}

func deleteFieldType(c *fiber.Ctx) error {
	var fieldType fieldtype.FieldTypes
	id := c.Params("id")
	db.DB.Delete(&fieldType, id)
	return c.SendStatus(fiber.StatusOK)
}
