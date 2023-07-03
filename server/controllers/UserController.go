// this file handles all the user controller functionality for the user API routes

package controllers

import (
	"fmt"
	"net/http"
	"workspace/config"
	"workspace/models"
	"workspace/repositories"

	"github.com/gin-gonic/gin"
	"github.com/google/go-github/github"
	"golang.org/x/oauth2"

	// "golang.org/x/oauth2/github"
	"gorm.io/gorm"
)

func RegisterController(
	c *gin.Context,
	db *gorm.DB,
) {
	// first declare user struct
	userModel := &models.User{}

	// parse the request body into the user struct
	err := c.ShouldBindJSON(&userModel)
	// check for errors
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid request body",
		})
		return
	}

	// we will have to create validators later

	// initiate new user repository
	userRepo := repositories.NewUserRepository(db)

	// create the user using repository
	user, err := userRepo.CreateUser(userModel)

	// check for errors
	if err != nil {
		c.JSON(409, gin.H{
			"error":  "There was an error while creating the user",
			"error2": err.Error(),
		})
		return
	}

	// return the response
	c.JSON(201, gin.H{
		"message": "Successfully created user",
		"email":   user.Email,
	})

}

func LoginController(
	c *gin.Context,
	db *gorm.DB,
) {
	// declare the login struct
	var loginData struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	// parse the request body into the login struct
	err := c.ShouldBindJSON(&loginData)
	// check for errors
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid login Data",
		})
		return
	}

	// Perform your login logic here with the email and password

	// make sure to escape the login data to prevent SQL injection

	// get the user email and password from the database and compare it with the login data
	userRepo := repositories.NewUserRepository(db)

	// get the user from the database
	user, err := userRepo.GetUserByEmail(loginData.Email)
	// check for errors
	if err != nil {
		c.JSON(404, gin.H{
			"error": "User not found",
		})
		return
	}

	// compare the password
	err = userRepo.ComparePassword(user.Password, loginData.Password)

	// check for errors
	if err != nil {
		c.JSON(401, gin.H{
			"error": "Invalid login credentials",
		})
		return
	}

	// c.JSON(200, gin.H{
	// 	"message": "Successfully logged in",
	// 	"email":   user.Email,
	// })

	// If login is successful, redirect the user to GitHub OAuth, do it in a way that doesnt affect cors
	url := config.GithubOauthConfig.AuthCodeURL("state", oauth2.AccessTypeOffline)

	// print the url
	fmt.Println(url)

	c.Redirect(http.StatusTemporaryRedirect, url)

}

func AuthCallbackController(c *gin.Context) {
	// Retrieve the authorization code from the query parameters
	code := c.Query("code")

	// Exchange the authorization code for an access token
	token, err := config.GithubOauthConfig.Exchange(oauth2.NoContext, code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to exchange code for token"})
		return
	}

	// Create a GitHub client using the access token
	client := github.NewClient(config.GithubOauthConfig.Client(oauth2.NoContext, token))

	// Fetch user information using the GitHub client
	user, callbackResponse, err := client.Users.Get(oauth2.NoContext, "")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user information"})
		return
	}

	user = user
	callbackResponse = callbackResponse

	// Perform further actions with the user information or store it as needed

	// Redirect or respond with the appropriate success message
	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}
