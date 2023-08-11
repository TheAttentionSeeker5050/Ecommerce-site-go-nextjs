// this file handles all the user controller functionality for the user API routes

package controllers

import (
	"fmt"
	"net/http"
	"os"
	"workspace/models"
	"workspace/repositories"
	"workspace/utils"
	// "strconv"

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

	// build the token claims payload
	tokenClaims := utils.TokenClaims{
		ID:        fmt.Sprint(user.ID),
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Provider:  user.Provider,
	}

	// now create the jwt token and save them into variables
	accessToken, refreshToken, err := utils.GenerateAccessAndRefreshToken(tokenClaims, c)
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

	// delete the refresh token from the cookie
	c.SetCookie("refresh_token", refreshToken, 6*60*60, "/", os.Getenv("CLIENT_ORIGIN_URL"), false, true)
	c.SetCookie("access_token", accessToken, 6*60*60, "/", os.Getenv("CLIENT_ORIGIN_URL"), false, true)
	c.SetCookie("logged_in", "true", 6*60*60, "/", os.Getenv("CLIENT_ORIGIN_URL"), false, true)

	c.JSON(http.StatusOK, gin.H{
		"message":      "Successfully logged in",
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
		"provider":     "local",
	})
	return
}

func ChangeEmailController(
	c *gin.Context,
	db *gorm.DB,
) {


	// get the user email from the claim
	email := c.GetString("email")
	userID := c.GetString("id")
	// if the email is empty return an error
	if email == "" || userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{ // status unauthorized
			"error": "Bad Request: No email found in token",
		})
		// c.Abort()
		return
	}

	// get the user by email from the database
	userRepo := repositories.NewUserRepository(db)
	user, err := userRepo.GetUserById(userID)

	// check for errors
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{ // should this be forbidden?
			// "error": err.Error(), // I have coded these errors messages so they are safe to return to the client
			"error": "Somethign went wrong while getting the user from the database",
		})
		// c.Abort()
		return
	}

	// get the new email from the request body
	var newEmail struct {
		Email string `json:"email"`
	}

	// parse the request body
	err = c.ShouldBindJSON(&newEmail)

	// if new email is empty return an error
	if newEmail.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Bad Request: No email found in request body",
		})
		// c.Abort()
		return
	}

	// check for errors
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		})
		// c.Abort()
		return
	}

	// update the user email using our repository
	changedUser, err := userRepo.ChangeEmail(user, newEmail.Email)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		// c.Abort()
		return
	}

	if changedUser == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to change email",
		})
		// c.Abort()
		return
	}

	// create a new user payload to be used for the jwt token
	tokenClaims := utils.TokenClaims{
		ID:        fmt.Sprint(changedUser.ID),
		Email:     changedUser.Email,
		FirstName: changedUser.FirstName,
		LastName:  changedUser.LastName,
		Provider:  changedUser.Provider,
	}

	// now create the jwt token and save them into variables
	accessToken, refreshToken, err := utils.GenerateAccessAndRefreshToken(tokenClaims, c)

	// check for errors
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{ // this goes for status unauthorized
			"error": "Failed to create access token",
		})

		// c.Abort()
		return
	}

	// save the session to the database
	err = repositories.NewDatabaseSessionStore(db).SaveSession(
		fmt.Sprint(changedUser.ID),
		changedUser.Email,
		accessToken,
	)

	// if there is an error saving the session to the database
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save session to database",
		})
		// c.Abort()
		return
	}

	// update the refresh token from the cookie
	c.SetCookie("refresh_token", refreshToken, 6*60*60, "/", os.Getenv("CLIENT_ORIGIN_URL"), false, true)
	c.SetCookie("access_token", accessToken, 6*60*60, "/", os.Getenv("CLIENT_ORIGIN_URL"), false, true)
	c.SetCookie("logged_in", "true", 6*60*60, "/", os.Getenv("CLIENT_ORIGIN_URL"), false, true)
	

	// return success REST response
	c.JSON(http.StatusOK, gin.H{
		"message":          "Successfully changed email",
		"newEmail":         newEmail.Email,
		"changedUserEmail": changedUser.Email,
	})
	return
}

func ChangePasswordController(
	c *gin.Context,
	db *gorm.DB,
) {

	// a dummy response for now
	c.JSON(200, gin.H{
		"message": "Successfully changed password",
	})
}

