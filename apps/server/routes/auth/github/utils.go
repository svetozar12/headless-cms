package github

import (
	"encoding/json"
	"net/http"
)

type GitHubUser struct {
	Login string `json:"login"` // GitHub username
	ID    int    `json:"id"`    // GitHub user ID
	// Add other fields as needed
}

func fetchGitHubUser(token string) (*GitHubUser, error) {
	// GitHub API endpoint for fetching user details
	url := "https://api.github.com/user"

	// Create a new request using http
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	// Add the authorization header with the OAuth token
	req.Header.Add("Authorization", "Bearer "+token)

	// Send the request using http.Client
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Decode the response body into the GitHubUser struct
	var user GitHubUser
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		return nil, err
	}

	return &user, nil
}
