package config

import (
	"os"

	"golang.org/x/oauth2"
	// "golang.org/x/oauth2/github"
)

var (
	GithubOauthConfig = &oauth2.Config{
		ClientID:     os.Getenv("OAUTH_CLIENT_ID"),
		ClientSecret: os.Getenv("OAUTH_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("OAUTH_CALLBACK_URL"),
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://github.com/login/oauth/authorize",
			TokenURL: "https://github.com/login/oauth/access_token",
		},
		// Endpoint:     github.Endpoint,
	}
)
