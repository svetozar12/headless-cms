package github

import (
	"github.com/gofiber/fiber/v2"
)

func AuthGithubRoutes(app fiber.Router) {
	authGithub := app.Group("/auth/github")
	authGithub.Get("/", getGithubAuth)
	authGithub.Get("/callback", getGithubAuthCallback)
}
