// Package docs GENERATED BY SWAG; DO NOT EDIT
// This file was generated by swaggo/swag
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "API Support",
            "email": "fiber@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/v1/content": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "content"
                ],
                "summary": "Get all content",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/content.Content"
                            }
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "content"
                ],
                "summary": "Create content",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/content.Body"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "$ref": "#/definitions/content.Content"
                        }
                    }
                }
            }
        },
        "/v1/content/{id}": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "content"
                ],
                "summary": "Get content by id",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/content.Content"
                        }
                    }
                }
            },
            "put": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "content"
                ],
                "summary": "Update content",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/content.Body"
                        }
                    },
                    {
                        "type": "integer",
                        "description": "ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/content.Content"
                        }
                    }
                }
            }
        },
        "/v1/contentModel": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "contentModel"
                ],
                "summary": "Get all content models",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/contentmodel.ContentModel"
                            }
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "contentModel"
                ],
                "summary": "Create content model",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/contentmodel.Body"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "$ref": "#/definitions/contentmodel.ContentModel"
                        }
                    }
                }
            }
        },
        "/v1/contentModel/{id}": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "contentModel"
                ],
                "summary": "Get content model by id",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/contentmodel.ContentModel"
                        }
                    }
                }
            },
            "put": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "contentModel"
                ],
                "summary": "Update content model",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/contentmodel.Body"
                        }
                    },
                    {
                        "type": "integer",
                        "description": "ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/contentmodel.ContentModel"
                        }
                    }
                }
            },
            "delete": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "contentModel"
                ],
                "summary": "Delete content model",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/v1/content{id}": {
            "delete": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "content"
                ],
                "summary": "Delete content",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/v1/field": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "field"
                ],
                "summary": "Get all fields",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/field.Field"
                            }
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "field"
                ],
                "summary": "Create field",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/field.Body"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/v1/field/{id}": {
            "put": {
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "field"
                ],
                "summary": "Update field",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/field.Body"
                        }
                    },
                    {
                        "type": "integer",
                        "description": "ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/field.Field"
                        }
                    }
                }
            },
            "delete": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "field"
                ],
                "summary": "Delete field",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "/v1/fieldType": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "fieldType"
                ],
                "summary": "Get all field types",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/fieldtype.FieldType"
                            }
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "fieldType"
                ],
                "summary": "Create field type",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/fieldtype.Body"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created",
                        "schema": {
                            "$ref": "#/definitions/fieldtype.FieldType"
                        }
                    }
                }
            }
        },
        "/v1/fieldType/{id}": {
            "put": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "fieldType"
                ],
                "summary": "Update field type",
                "parameters": [
                    {
                        "description": "query params",
                        "name": "request",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/fieldtype.Body"
                        }
                    },
                    {
                        "type": "integer",
                        "description": "ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/definitions/fieldtype.FieldType"
                        }
                    }
                }
            },
            "delete": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "fieldType"
                ],
                "summary": "Delete field type",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "content.Body": {
            "type": "object",
            "required": [
                "modelId",
                "name",
                "userId"
            ],
            "properties": {
                "modelId": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            }
        },
        "content.Content": {
            "type": "object",
            "required": [
                "contentModel",
                "id",
                "modelId",
                "name",
                "userId"
            ],
            "properties": {
                "contentModel": {
                    "$ref": "#/definitions/contentmodel.ContentModel"
                },
                "createdAt": {
                    "type": "string"
                },
                "deletedAt": {
                    "$ref": "#/definitions/gorm.DeletedAt"
                },
                "id": {
                    "type": "integer"
                },
                "modelId": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "updatedAt": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            }
        },
        "contentmodel.Body": {
            "type": "object",
            "required": [
                "name",
                "userId"
            ],
            "properties": {
                "description": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            }
        },
        "contentmodel.ContentModel": {
            "type": "object",
            "required": [
                "fieldTypes",
                "id",
                "name",
                "userId"
            ],
            "properties": {
                "createdAt": {
                    "type": "string"
                },
                "deletedAt": {
                    "$ref": "#/definitions/gorm.DeletedAt"
                },
                "description": {
                    "type": "string"
                },
                "fieldTypes": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/fieldtype.FieldType"
                    }
                },
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "updatedAt": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            }
        },
        "field.Body": {
            "type": "object",
            "required": [
                "contentId",
                "name",
                "typeId"
            ],
            "properties": {
                "contentId": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "typeId": {
                    "type": "integer"
                },
                "value": {
                    "type": "string"
                }
            }
        },
        "field.Field": {
            "type": "object",
            "required": [
                "contentId",
                "id",
                "name",
                "typeId"
            ],
            "properties": {
                "contentId": {
                    "type": "integer"
                },
                "createdAt": {
                    "type": "string"
                },
                "deletedAt": {
                    "$ref": "#/definitions/gorm.DeletedAt"
                },
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "typeId": {
                    "type": "integer"
                },
                "updatedAt": {
                    "type": "string"
                },
                "value": {
                    "type": "string"
                }
            }
        },
        "fieldtype.Body": {
            "type": "object",
            "required": [
                "contentModelId",
                "name"
            ],
            "properties": {
                "contentModelId": {
                    "type": "integer"
                },
                "fieldType": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                }
            }
        },
        "fieldtype.FieldType": {
            "type": "object",
            "required": [
                "contentModelId",
                "id",
                "name"
            ],
            "properties": {
                "contentModelId": {
                    "type": "integer"
                },
                "createdAt": {
                    "type": "string"
                },
                "deletedAt": {
                    "$ref": "#/definitions/gorm.DeletedAt"
                },
                "fieldType": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "updatedAt": {
                    "type": "string"
                }
            }
        },
        "gorm.DeletedAt": {
            "type": "object",
            "properties": {
                "time": {
                    "type": "string"
                },
                "valid": {
                    "description": "Valid is true if Time is not NULL",
                    "type": "boolean"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:4000",
	BasePath:         "/",
	Schemes:          []string{},
	Title:            "Fiber Example API",
	Description:      "This is a sample swagger for Fiber",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
