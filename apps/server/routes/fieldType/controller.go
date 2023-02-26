package fieldType

import (
	"strconv"
	"svetozar12/headless-cms-be/db"
	"svetozar12/headless-cms-be/models"

	"github.com/gofiber/fiber/v2"
)

// Content godoc
// @Summary      Get all field types
// @Tags         fieldType
// @Accept       json
// @Param        page    query     int  false  "page"  default(1)
// @Param        limit    query     int  false  "limit"  default(10)
// @Success      200  {object} models.PaginationModel[[]models.FieldType]
// @Router       /v1/fieldType [get]
func getFieldTypes(c *fiber.Ctx) error {
	var fieldTypes []models.FieldType
	var total int64
	page, _ := strconv.Atoi(c.Query("page"))
	limit, _ := strconv.Atoi(c.Query("limit"))
	offSet := (page - 1) * limit
	db.DB.Find(&fieldTypes).Count(&total)
	db.DB.Offset(offSet).Limit(limit).Find(&fieldTypes)
	return c.Status(fiber.StatusOK).JSON(models.PaginationModel[[]models.FieldType]{Pagination: models.Pagination{Total: total, Offset: page, Limit: limit}, Data: fieldTypes})
}

// Content godoc
// @Summary      Create field type
// @Tags         fieldType
// @Accept       json
// @Param request body models.FieldTypeBody true "query params""
// @Success      201  {object} models.FieldType
// @Router       /v1/fieldType [post]
func createFieldType(c *fiber.Ctx) error {
	fieldType := new(models.FieldType)
	err := c.BodyParser(fieldType)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)
	}
	db.DB.Create(&fieldType)
	return c.Status(fiber.StatusCreated).JSON(fieldType)
}

// Content godoc
// @Summary      Update field type
// @Tags         fieldType
// @Accept       json
// @Param request body models.FieldTypeBody true "query params"
// @Param id     path int true "ID"
// @Success      200  {object}   models.FieldType
// @Router       /v1/fieldType/{id} [put]
func updateFieldType(c *fiber.Ctx) error {
	fieldType := new(models.FieldType)

	id := c.Params("id")
	err := c.BodyParser(fieldType)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)
	}
	db.DB.Where("id = ?", id).Updates(&fieldType)
	return c.Status(fiber.StatusOK).JSON(fieldType)
}

// Content godoc
// @Summary      Delete field type
// @Tags         fieldType
// @Accept       json
// @Param id     path int true "ID"
// @Success      200  {string} ok
// @Router       /v1/fieldType/{id} [delete]
func deleteFieldType(c *fiber.Ctx) error {
	var fieldType models.FieldType
	id := c.Params("id")
	db.DB.Delete(&fieldType, id)
	return c.SendStatus(fiber.StatusOK)
}
