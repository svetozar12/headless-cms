package main

import (
	"database/sql"
	"svetozar12/headless-cms-be/routes"

	"github.com/gofiber/fiber/v2"
	_ "github.com/lib/pq"
)

func main() {
	app := fiber.New()
	db, err := sql.Open("postgres", "postgresql://postgres:eI78CKrbpN6yDqqwxUZs@containers-us-west-114.railway.app:6886/railway")
	if err != nil {
		panic(err)
	}
	defer db.Close()
	routes.InitRoutes(app)

	app.Listen(":3000")
}
