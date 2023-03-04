package content

import (
	"fmt"
	"strconv"
	"svetozar12/headless-cms-be/db"
	"svetozar12/headless-cms-be/models"

	"github.com/gofiber/fiber/v2"
)

// Content godoc
// @Summary      Get content by id
// @Tags         content
// @Accept       json
// @Param id     path int true "ID"
// @Success      200  {object} models.Content
// @Router       /v1/content/{id} [get]
func GetContentById(c *fiber.Ctx) error {
	var content models.Content
	id := c.Params("id")

	if err := db.DB.Preload("ContentModel").First(&content, id); err != nil {

		return c.Status(fiber.StatusNotFound).SendString("Not Found")
	}
	return c.Status(fiber.StatusOK).JSON(content)
}

// Content godoc
// @Summary      Get all content
// @Tags         content
// @Accept       json
// @Param        page     query     int  false  "page"   default(1)
// @Param        limit    query     int  false  "limit"  default(10)
// @Param        userId  query     string  true   "userId"
// @Success      200  {object} models.PaginationModel[[]models.Content]
// @Router       /v1/content [get]
func GetContent(c *fiber.Ctx) error {
	var content []models.Content
	var total int64
	page, _ := strconv.Atoi(c.Query("page"))
	limit, _ := strconv.Atoi(c.Query("limit"))
	userId := c.Query("userId")
	fmt.Println(userId)
	offSet := (page - 1) * limit
	db.DB.Where("user_id = ?", userId).Preload("ContentModel").Find(&content).Count(&total)
	db.DB.Where("user_id = ?", userId).Preload("ContentModel").Offset(offSet).Limit(limit).Find(&content)
	return c.Status(fiber.StatusOK).JSON(models.PaginationModel[[]models.Content]{Pagination: models.Pagination{Total: total, Offset: page, Limit: limit}, Data: content})
}

// Content godoc
// @Summary      Create content
// @Tags         content
// @Accept       json
// @Param request body models.ContentBody true "query params""
// @Success      201  {object} models.Content
// @Router       /v1/content [post]
func CreateContent(c *fiber.Ctx) error {
	content := new(models.Content)
	var fieldTypes []models.FieldType
	err := c.BodyParser(content)
	if err != nil {
		return c.SendStatus(fiber.ErrUnprocessableEntity.Code)
	}

	db.DB.Where("content_model_id = ?", content.ModelId).Find(&fieldTypes)
	db.DB.Create(&content)
	db.DB.Preload("ContentModel").First(&content, content.ID)

	var fields []models.Field
	for i := 0; i < len(fieldTypes); i++ {
		fieldType := fieldTypes[i]
		field := models.Field{FieldType: fieldType, FieldBody: models.FieldBody{Name: fieldType.Name, Value: "", TypeId: int(fieldType.ID), ContentId: int(content.ID)}}
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
// @Param request body models.ContentTypeBody true "query params"
// @Param id     path int true "ID"
// @Success      200  {object}   models.Content
// @Router       /v1/content/{id} [put]
func UpdateContent(c *fiber.Ctx) error {
	content := new(models.Content)
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
func DeleteContent(c *fiber.Ctx) error {
	id := c.Params("id")
	var content models.Content
	result := db.DB.Delete(&content, id)
	if result.RowsAffected == 0 {
		return c.SendStatus(fiber.StatusNotFound)
	}
	return c.SendStatus(fiber.StatusOK)
}
