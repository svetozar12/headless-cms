package field

import (
	"svetozar12/headless-cms-be/db"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Body struct {
	Name      string `json:"name" binding:"required"`
	Value     string `json:"value"`
	TypeId    int    `json:"typeId" binding:"required"`
	ContentId int    `json:"contentId" binding:"required"`
}

type Field struct {
	gorm.Model
	Body
}

func FieldRoutes(app fiber.Router) {
	field := app.Group("/field")
	field.Get("/", getFields)
	field.Post("/", createField)
	field.Put("/:id", updateField)
	field.Delete("/:id", deleteField)
}

// Content godoc
// @Summary      Get all fields
// @Tags         field
// @Accept       json
// @Success      200  {array} field.Field
// @Router       /v1/field [get]
func getFields(c *fiber.Ctx) error {
	var fields []Field
	db.DB.Find(&fields)
	return c.Status(fiber.StatusOK).JSON(fields)
}

// Content godoc
// @Summary      Create field
// @Tags         field
// @Accept       json
// @Param request body field.Body true "query params""
// @Success      201  {string} field.Field
// @Router       /v1/field [post]
func createField(c *fiber.Ctx) error {
	field := new(Field)
	err := c.BodyParser(field)
	if err != nil {
		return c.SendStatus(fiber.ErrUnprocessableEntity.Code)
	}
	db.DB.Create(&field)
	return c.Status(fiber.StatusCreated).JSON(&field)
}

// Content godoc
// @Summary      Update field
// @Tags         field
// @Accept       json
// @Produce      json
// @Param request body field.Body true "query params"
// @Param id     path int true "ID"
// @Success      200  {object}   field.Field
// @Router       /v1/field/{id} [put]
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

// Content godoc
// @Summary      Delete field
// @Tags         field
// @Accept       json
// @Param id     path int true "ID"
// @Success      200  {string} ok
// @Router       /v1/field/{id} [delete]
func deleteField(c *fiber.Ctx) error {
	id := c.Params("id")
	var field Field
	db.DB.Delete(&field, id)
	return c.SendStatus(fiber.StatusOK)
}
