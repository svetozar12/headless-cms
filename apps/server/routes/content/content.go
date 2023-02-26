package content

import (
	"fmt"
	"strconv"
	"svetozar12/headless-cms-be/db"
	"svetozar12/headless-cms-be/models"
	"svetozar12/headless-cms-be/routes/content/contentModel"
	field "svetozar12/headless-cms-be/routes/field"
	fieldtype "svetozar12/headless-cms-be/routes/fieldType"

	"github.com/gofiber/fiber/v2"
)

func ContentRoutes(app fiber.Router) {
	content := app.Group("/content")
	content.Get("/:id", getContentById)
	content.Get("/", getContent)
	content.Post("/", createContent)
	content.Put("/:id", updateContent)
	content.Delete("/:id", deleteContent)
}

// Content godoc
// @Summary      Get content by id
// @Tags         content
// @Accept       json
// @Param id     path int true "ID"
// @Success      200  {object} contentModel.Content
// @Router       /v1/content/{id} [get]
func getContentById(c *fiber.Ctx) error {
	var content contentModel.Content
	id := c.Params("id")

	db.DB.Preload("ContentModel").First(&content, id)
	return c.Status(fiber.StatusOK).JSON(content)
}

// Content godoc
// @Summary      Get all content
// @Tags         content
// @Accept       json
// @Param        page     query     int  false  "page"   default(1)
// @Param        limit    query     int  false  "limit"  default(10)
// @Param        userId  query     string  true   "userId"
// @Success      200  {object} models.PaginationModel[[]contentModel.Content]
// @Router       /v1/content [get]
func getContent(c *fiber.Ctx) error {
	var content []contentModel.Content
	var total int64
	page, _ := strconv.Atoi(c.Query("page"))
	limit, _ := strconv.Atoi(c.Query("limit"))
	userId := c.Query("userId")
	fmt.Println(userId)
	offSet := (page - 1) * limit
	db.DB.Where("user_id = ?", userId).Preload("ContentModel").Find(&content).Count(&total)
	db.DB.Where("user_id = ?", userId).Preload("ContentModel").Offset(offSet).Limit(limit).Find(&content)
	return c.Status(fiber.StatusOK).JSON(models.PaginationModel[[]contentModel.Content]{Pagination: models.Pagination{Total: total, Offset: page, Limit: limit}, Data: content})
}

// Content godoc
// @Summary      Create content
// @Tags         content
// @Accept       json
// @Param request body contentModel.Body true "query params""
// @Success      201  {object} contentModel.Content
// @Router       /v1/content [post]
func createContent(c *fiber.Ctx) error {
	content := new(contentModel.Content)
	var fieldTypes []fieldtype.FieldType
	err := c.BodyParser(content)
	if err != nil {
		return c.SendStatus(fiber.ErrUnprocessableEntity.Code)
	}

	db.DB.Where("content_model_id = ?", content.ModelId).Find(&fieldTypes)
	db.DB.Create(&content)
	db.DB.Preload("ContentModel").First(&content, content.ID)

	var fields []field.Field
	for i := 0; i < len(fieldTypes); i++ {
		fieldType := fieldTypes[i]
		field := field.Field{FieldType: fieldType, Body: field.Body{Name: fieldType.Name, Value: "", TypeId: int(fieldType.ID), ContentId: int(content.ID)}}
		fields = append(fields, field)
	}
	db.DB.Create(&fields)
	return c.Status(fiber.StatusCreated).JSON(content)
}

// Content godoc
// @Summary      Update content
// @Tags         content
// @Accept       json
// @Produce      json
// @Param request body contentModel.Body true "query params"
// @Param id     path int true "ID"
// @Success      200  {object}   contentModel.Content
// @Router       /v1/content/{id} [put]
func updateContent(c *fiber.Ctx) error {
	content := new(contentModel.Content)
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
// @Router       /v1/content/{id} [delete]
func deleteContent(c *fiber.Ctx) error {
	id := c.Params("id")
	var content contentModel.Content
	result := db.DB.Delete(&content, id)
	if result.RowsAffected == 0 {
		return c.SendStatus(fiber.StatusNotFound)
	}
	return c.SendStatus(fiber.StatusOK)
}
