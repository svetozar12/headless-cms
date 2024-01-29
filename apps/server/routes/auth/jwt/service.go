package jwt

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

type CustomClaims struct {
	jwt.StandardClaims
	UserID int
}

var jwtSecretKey = []byte("your_secret_key") // Ensure this key is stored securely

func CreateJWTToken(userID int) (string, error) {
	// Set custom and standard claims
	claims := CustomClaims{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(), // Token expiry
			Issuer:    "HeadlessCms",                         // Issuer
		},
		UserID: userID,
	}

	// Create a new token object
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token with your secret key
	return token.SignedString(jwtSecretKey)
}

func jwtMiddleware(c *fiber.Ctx) error {
	// Extract the token from request headers, cookies, or other means
	tokenString := c.Get("Authorization")

	// Parse and validate the token
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecretKey, nil
	})

	if err != nil || !token.Valid {
		return c.Status(fiber.StatusUnauthorized).SendString("Invalid or expired token")
	}

	return c.Next()
}
