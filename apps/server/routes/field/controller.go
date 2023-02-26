package field

import (
	"strconv"
	"svetozar12/headless-cms-be/db"
	"svetozar12/headless-cms-be/models"

	"github.com/gofiber/fiber/v2"
)

// Content godoc
// @Summary      Get field by id
// @Tags         field
// @Accept       json
// @Param id     path int true "ID"
// @Success      200  {object} models.Field
// @Router       /v1/field/{id} [get]
func getFieldById(c *fiber.Ctx) error {
	var field models.Field
	id := c.Params("id")

	db.DB.Preload("FieldType").First(&field, id)
	return c.Status(fiber.StatusOK).JSON(field)
}

// Content godoc
// @Summary      Get all fields
// @Tags         field
// @Accept       json
// @Param        page     	query     int  false  "page"   default(1)
// @Param        limit    	query     int  false  "limit"  default(10)
// @Param        contentId  query     int  true   "contentId"
// @Success      200  {object} models.PaginationModel[[]models.Field]
// @Router       /v1/field [get]
func getFields(c *fiber.Ctx) error {
	var fields []models.Field
	var total int64
	page, _ := strconv.Atoi(c.Query("page"))
	limit, _ := strconv.Atoi(c.Query("limit"))
	contentId, _ := strconv.Atoi(c.Query("contentId"))
	offSet := (page - 1) * limit
	db.DB.Where("content_id = ?", contentId).Preload("FieldType").Find(&fields).Count(&total)
	db.DB.Where("content_id = ?", contentId).Preload("FieldType").Offset(offSet).Limit(limit).Find(&fields)
	return c.Status(fiber.StatusOK).JSON(models.PaginationModel[[]models.Field]{Pagination: models.Pagination{Total: total, Offset: page, Limit: limit}, Data: fields})
}

// Content godoc
// @Summary      Create field
// @Tags         field
// @Accept       json
// @Param request body models.FieldBody true "query params""
// @Success      201  {string} fieldModel.Field
// @Router       /v1/field [post]
func createField(c *fiber.Ctx) error {
	field := new(models.Field)
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
// @Param request body models.FieldBody true "query params"
// @Param id     path int true "ID"
// @Success      200  {object}   models.Field
// @Router       /v1/field/{id} [put]
func updateField(c *fiber.Ctx) error {
	id := c.Params("id")
	field := new(models.Field)
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
	var field models.Field
	db.DB.Delete(&field, id)
	return c.SendStatus(fiber.StatusOK)
}
