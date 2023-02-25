package contentmodel

import (
	"strconv"
	"svetozar12/headless-cms-be/db"
	"svetozar12/headless-cms-be/models"
	fieldtype "svetozar12/headless-cms-be/routes/fieldType"
	"svetozar12/headless-cms-be/types"

	"github.com/gofiber/fiber/v2"
)

type Body struct {
	Name        string `json:"name" binding:"required"`
	UserId      string `json:"userId" binding:"required"`
	Description string `json:"description"`
}

type ContentModel struct {
	models.Model
	Body
	FieldTypes []fieldtype.FieldType `gorm:"foreignKey:ContentModelId;constraint:OnDelete:CASCADE;" json:"fieldTypes" binding:"required"`
	types.ContentList
}

func ContentModelRoutes(app fiber.Router) {
	contentModel := app.Group("/contentModel")
	contentModel.Get("/:id", getContentModelById)
	contentModel.Get("/", getContentModel)
	contentModel.Post("/", createContentModel)
	contentModel.Put("/:id", updateContentModel)
	contentModel.Delete("/:id", deleteContentModel)
}

// Content godoc
// @Summary      Get content model by id
// @Tags         contentModel
// @Accept       json
// @Param id     path int true "ID"
// @Success      200  {object} contentmodel.ContentModel
// @Router       /v1/contentModel/{id} [get]
func getContentModelById(c *fiber.Ctx) error {
	var contentModel ContentModel
	id := c.Params("id")
	db.DB.Preload("FieldTypes").Where("id = ?", id).First(&contentModel)
	return c.Status(fiber.StatusOK).JSON(contentModel)
}

// Content godoc
// @Summary      Get all content models
// @Tags         contentModel
// @Param        page    query     int  false  "page"  default(1)
// @Param        limit    query     int  false  "limit"  default(10)
// @Accept       json
// @Success      200  {object} models.PaginationModel[[]contentmodel.ContentModel]
// @Router       /v1/contentModel [get]
func getContentModel(c *fiber.Ctx) error {
	var contentModels []ContentModel
	var total int64
	page, _ := strconv.Atoi(c.Query("page"))
	limit, _ := strconv.Atoi(c.Query("limit"))
	offSet := (page - 1) * limit
	db.DB.Preload("FieldTypes").Find(&contentModels).Count(&total)
	db.DB.Preload("FieldTypes").Offset(offSet).Limit(limit).Find(&contentModels)
	return c.Status(fiber.StatusOK).JSON(models.PaginationModel[[]ContentModel]{Pagination: models.Pagination{Total: total, Offset: page, Limit: limit}, Data: contentModels})
}

// Content godoc
// @Summary      Create content model
// @Tags         contentModel
// @Accept       json
// @Param request body contentmodel.Body true "query params""
// @Success      201  {object} contentmodel.ContentModel
// @Router       /v1/contentModel [post]
func createContentModel(c *fiber.Ctx) error {
	contentModel := new(ContentModel)
	err := c.BodyParser(contentModel)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)
	}
	db.DB.Create(&contentModel)

	return c.Status(fiber.StatusCreated).JSON(contentModel)
}

// Content godoc
// @Summary      Update content model
// @Tags         contentModel
// @Accept       json
// @Produce      json
// @Param request body contentmodel.Body true "query params"
// @Param id     path int true "ID"
// @Success      200  {object}   contentmodel.ContentModel
// @Router       /v1/contentModel/{id} [put]
func updateContentModel(c *fiber.Ctx) error {
	id := c.Params("id")
	contentModel := new(ContentModel)
	err := c.BodyParser(contentModel)
	if err != nil {
		return c.Status(fiber.ErrUnprocessableEntity.Code).JSON(err)
	}
	db.DB.Where("id = ?", id).Updates(&contentModel)
	return c.Status(fiber.StatusOK).JSON(contentModel)
}

// Content godoc
// @Summary      Delete content model
// @Tags         contentModel
// @Accept       json
// @Param id     path int true "ID"
// @Success      200  {string} ok
// @Router       /v1/contentModel/{id} [delete]
func deleteContentModel(c *fiber.Ctx) error {
	id := c.Params("id")
	var contentModel ContentModel
	var fieldType fieldtype.FieldType

	db.DB.Where("content_model_id = ?", id).Delete(&fieldType)
	result := db.DB.Delete(&contentModel, id)
	if result.RowsAffected == 0 {
		return c.SendStatus(fiber.StatusNotFound)
	}
	return c.SendStatus(fiber.StatusOK)
}
