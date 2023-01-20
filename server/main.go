package main

import (
	"svetozar12/headless-cms-be/db"
	"svetozar12/headless-cms-be/routes"

	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

func main() {
	app := fiber.New()
	db.Open()
	routes.InitRoutes(app)

	app.Listen(":4000")
}
