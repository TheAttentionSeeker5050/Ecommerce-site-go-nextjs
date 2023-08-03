// this file handles all the user controller functionality for the user API routes

package controllers

import (
	"fmt"
	"net/http"
	"workspace/models"
	"workspace/repositories"
	"workspace/utils"

	"github.com/gin-gonic/gin"

	// "golang.org/x/oauth2/github"
	"gorm.io/gorm"
	// session stuff
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

	// now create the jwt token and save them into variables
	accessToken, refreshToken, err := utils.GenerateAccessAndRefreshToken(user, c)
	if err != nil {
		c.JSON(500, gin.H{
			"error":     "Failed to create access token",
			"errorType": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// save the session to the database
	err = repositories.NewDatabaseSessionStore(db).SaveSession(
		fmt.Sprint(user.ID),
		user.Email,
		accessToken,
	)

	c.JSON(http.StatusOK, gin.H{
		"message":      "Successfully logged in",
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
		"provider":     "local",
	})
	return
}
