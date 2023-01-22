package content

import (
	"fmt"
	"svetozar12/headless-cms-be/db"
	field "svetozar12/headless-cms-be/routes/field"
	fieldtype "svetozar12/headless-cms-be/routes/fieldType"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Content struct {
	gorm.Model
	Name    string `json:"name"`
	ModelId int    `json:"modelId"`
	UserId  int    `json:"userId"`
}

func ContentRoutes(app fiber.Router) {
	content := app.Group("/content")
	content.Get("/", getContent)
	content.Post("/", createContent)
	content.Put("/:id", updateContent)
	content.Delete("/:id", deleteContent)
}

func getContent(c *fiber.Ctx) error {
	var content []Content
	db.DB.Find(&content)
	return c.Status(fiber.StatusOK).JSON(content)
}

func createContent(c *fiber.Ctx) error {
	content := new(Content)
	var fieldTypes []fieldtype.FieldTypes
	err := c.BodyParser(content)
	if err != nil {
		return c.SendStatus(fiber.ErrUnprocessableEntity.Code)
	}
	db.DB.Where("content_model_id = ?", content.ModelId).Find(&fieldTypes)
	db.DB.Create(&content)
	for i := 0; i < len(fieldTypes); i++ {
		fmt.Println(fieldTypes[i])
		fieldType := fieldTypes[i]
		field := field.Field{Name: fieldType.Name, Value: "", TypeId: int(fieldType.ID), ContentId: int(content.ID)}
		db.DB.Create(&field)
	}
	return c.Status(fiber.StatusCreated).JSON(content)
}

// Content godoc
// @Summary      Update content
// @Description  update content
// @Tags         content
// @Accept       json
// @Produce      json
// @Param request body content.Content true "query params"
// @Success      200  {object}   content.Content
// @Router       /content [put]
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

func deleteContent(c *fiber.Ctx) error {
	id := c.Params("id")
	var content Content
	result := db.DB.Delete(&content, id)
	if result.RowsAffected == 0 {
		return c.SendStatus(fiber.StatusNotFound)
	}
	return c.SendStatus(fiber.StatusOK)
}
