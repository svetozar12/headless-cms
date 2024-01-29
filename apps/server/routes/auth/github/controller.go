package github

import (
	"os"
	"svetozar12/headless-cms-be/routes/auth/jwt"
	"time"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

var OauthConfig = &oauth2.Config{
	ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
	ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
	Scopes:       []string{"read:user"},
	Endpoint:     github.Endpoint,
}

func getGithubAuth(c *fiber.Ctx) error {
	// Redirect user to GitHub for authorization
	url := OauthConfig.AuthCodeURL("state", oauth2.AccessTypeOnline)
	return c.Redirect(url)
}

func getGithubAuthCallback(c *fiber.Ctx) error {
	code := c.Query("code")
	token, err := OauthConfig.Exchange(c.Context(), code)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to exchange token: " + err.Error())
	}
	user, _ := fetchGitHubUser(token.AccessToken)
	jwtToken, err := jwt.CreateJWTToken(user.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to create JWT token: " + err.Error())
	}
	// Set the token in a secure, HttpOnly cookie
	cookie := new(fiber.Cookie)
	cookie.Name = "accessToken"
	cookie.Value = jwtToken
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HTTPOnly = true
	cookie.Secure = true // Set to true in production when using HTTPS
	c.Cookie(cookie)

	// Redirect to the FE application
	feAppURL := os.Getenv("FE_URL")
	return c.Redirect(feAppURL)
}
