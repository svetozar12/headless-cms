package content

import (
	"fmt"
	"svetozar12/headless-cms-be/db"
	field "svetozar12/headless-cms-be/routes/field"
	fieldtype "svetozar12/headless-cms-be/routes/fieldType"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Body struct {
	Name    string `json:"name" binding:"required"`
	ModelId int    `json:"modelId" binding:"required"`
	UserId  int    `json:"userId" binding:"required"`
}

type Content struct {
	gorm.Model
	Body
}

func ContentRoutes(app fiber.Router) {
	content := app.Group("/content")
	content.Get("/", getContent)
	content.Post("/", createContent)
	content.Put("/:id", updateContent)
	content.Delete("/:id", deleteContent)
}

// Content godoc
// @Summary      Get all content
// @Tags         content
// @Accept       json
// @Success      200  {array} content.Content
// @Router       /v1/content [get]
func getContent(c *fiber.Ctx) error {
	var content []Content
	db.DB.Find(&content)
	return c.Status(fiber.StatusOK).JSON(content)
}

// Content godoc
// @Summary      Create content
// @Tags         content
// @Accept       json
// @Param request body content.Body true "query params""
// @Success      201  {string} content.Content
// @Router       /v1/content [post]
func createContent(c *fiber.Ctx) error {
	content := new(Content)
	var fieldTypes []fieldtype.FieldType
	err := c.BodyParser(content)
	if err != nil {
		return c.SendStatus(fiber.ErrUnprocessableEntity.Code)
	}
	db.DB.Where("content_model_id = ?", content.ModelId).Find(&fieldTypes)
	db.DB.Create(&content)
	for i := 0; i < len(fieldTypes); i++ {
		fmt.Println(fieldTypes[i])
		fieldType := fieldTypes[i]
		field := field.Body{Name: fieldType.Name, Value: "", TypeId: int(fieldType.ID), ContentId: int(content.ID)}

		db.DB.Create(&field)
	}
	return c.Status(fiber.StatusCreated).JSON(content)
}

// Content godoc
// @Summary      Update content
// @Tags         content
// @Accept       json
// @Produce      json
// @Param request body content.Body true "query params"
// @Param id     path int true "ID"
// @Success      200  {object}   content.Content
// @Router       /v1/content/{id} [put]
func updateContent(c *fiber.Ctx) error {
	content := new(Content)
	id := c.Params("id")
	err := c.BodyParser(content)
	if err != nil {
		return c.SendStatus(fiber.ErrUnprocessableEntity.Code)
	}
	db.DB.Where("id = ?", id).Updates(&content)
	return c.Status(fiber.StatusOK).JSON(content)
}

// Content godoc
// @Summary      Delete content
// @Tags         content
// @Accept       json
// @Param id     path int true "ID"
// @Success      200  {string} ok
// @Router       /v1/content{id} [delete]
func deleteContent(c *fiber.Ctx) error {
	id := c.Params("id")
	var content Content
	result := db.DB.Delete(&content, id)
	if result.RowsAffected == 0 {
		return c.SendStatus(fiber.StatusNotFound)
	}
	return c.SendStatus(fiber.StatusOK)
}
