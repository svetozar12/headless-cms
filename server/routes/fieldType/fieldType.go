package fieldtype

import (
	"svetozar12/headless-cms-be/db"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type FieldTypes struct {
	gorm.Model
	Name           string `json:"name"`
	FieldType      string `json:"fieldType"`
	ContentModelId int    `json:"contentModelId"`
}

func FieldType(app fiber.Router) {
	fieldType := app.Group("/fieldType")
	fieldType.Get("/", getFieldType)
	fieldType.Post("/", createFieldType)
	fieldType.Put("/:id", updateFieldType)
	fieldType.Delete("/:id", deleteFieldType)
}

func getFieldType(c *fiber.Ctx) error {
	var fieldTypes []FieldTypes
	db.DB.Find(&fieldTypes)
	return c.Status(fiber.StatusOK).JSON(fieldTypes)
}

func createFieldType(c *fiber.Ctx) error {
	fieldType := new(FieldTypes)
	err := c.BodyParser(fieldType)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)
	}
	db.DB.Create(&fieldType)
	return c.Status(fiber.StatusCreated).JSON(fieldType)
}

func updateFieldType(c *fiber.Ctx) error {
	fieldType := new(FieldTypes)
	id := c.Params("id")
	err := c.BodyParser(fieldType)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)

	}
	db.DB.Where("id = ?", id).Updates(&fieldType)
	return c.Status(fiber.StatusOK).JSON(fieldType)
}

func deleteFieldType(c *fiber.Ctx) error {
	var fieldType FieldTypes
	id := c.Params("id")
	db.DB.Delete(&fieldType, id)
	return c.SendStatus(fiber.StatusOK)
}
