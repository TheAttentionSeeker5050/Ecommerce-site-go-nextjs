package controllers

import (
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"
	"workspace/models"
	"workspace/repositories"
	"workspace/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GitHubAuthController(ctx *gin.Context, db *gorm.DB) {
	// get the code from the query string
	code := ctx.Query("code")

	// initiate the from path url variable
	var pathUrl string = "/"

	// check if the state is present and not empty and assign it to pathUrl
	if ctx.Query("state") != "" {
		pathUrl = ctx.Query("state")
	}

	// check if the code is present and not empty
	if code == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "Authorization code not provided!",
		})
		return
	}

	// with the code now get the id and the access token
	tokenRes, err := utils.GetGithubOAuthToken(code)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{
			"message": "Failed to get access token!",
			// display error message if debug mode is true using conditional operator, but first encodes the error message to string
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// if token response doesnt have any values
	if tokenRes.AccessToken == "" {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Could not get access token from the Github OAuth API!",
		})
		return
	}

	// get the user information using the access token
	userRes, err := utils.GetGithubOAuthUser(tokenRes.AccessToken)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{
			"message": "Failed to get user information from the access token!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// if user response doesnt have any values
	if userRes.Name == "" || userRes.Photo == "" {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Could not get user information from the Github OAuth API!",
		})
		return
	}

	// save time as an int
	currentTime := time.Now().Unix()

	// name a var email not provided if email is not provided as boolean, true if email value start with no_email__ and false if email value does not start with no_email__
	var emailNotProvided bool = userRes.Email == "no_email__"+userRes.GitHubUsername

	// create a new user struct
	resBody := &models.User{
		FirstName: userRes.Name,
		LastName:  "",
		Email:     userRes.Email,
		Photo:     userRes.Photo,
		Provider:  "github",
		CreatedAt: currentTime,
		UpdatedAt: currentTime,
	}

	userRepo := repositories.NewUserRepository(db)
	// check if user email already exists
	user, err := userRepo.GetUserByEmail(resBody.Email)

	if user != nil {
		// if the user exists, update the user
		userRepo.DB.Model(&user).Updates(resBody)
	} else {
		// if the user does not exist, create the user
		userRepo.CreateUser(resBody)
	}

	// parse os string token expiration time hours to int
	tokenExpirationHours, err := strconv.Atoi(os.Getenv("TOKEN_EXPIRES_IN_HOURS"))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to parse token expiration hours!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// generate access and refresh token usign our util method
	access_token, refresh_token, err := utils.GenerateAccessAndRefreshToken(resBody.ID, ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to generate access token!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
			// "type":  errorType,
		})
		return
	}

	// save user session using repository
	sessionRepo := repositories.NewDatabaseSessionStore(db)
	err = sessionRepo.SaveSession(
		// save user id as string
		strconv.Itoa(int(user.ID)),
		access_token,
		refresh_token,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to save user session!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// add the client domain name to a variable from environment variables
	var domainName string = os.Getenv("CLIENT_ORIGIN_URL")

	// set cookies
	ctx.SetCookie("access_token", access_token, tokenExpirationHours*60*60, "/", domainName, false, true)
	ctx.SetCookie("refresh_token", refresh_token, tokenExpirationHours*60*60, "/", domainName, false, true)
	ctx.SetCookie("logged_in", "true", tokenExpirationHours*60*60, "/", domainName, false, true)

	var redirectEmailNotProvided string = "/account/update-email"

	// if email is not provided, redirect to the update email page
	if emailNotProvided {
		ctx.Redirect(http.StatusTemporaryRedirect, fmt.Sprint(os.Getenv("CLIENT_ORIGIN_URL")+redirectEmailNotProvided))
		return
	} else {
		// redirect to the client default url login success path if email is provided
		ctx.Redirect(http.StatusTemporaryRedirect, fmt.Sprint(os.Getenv("CLIENT_ORIGIN_URL")+pathUrl))
		return
	}
}

func GoogleAuthController(ctx *gin.Context, db *gorm.DB) {

	// get the code from the query string
	code := ctx.Query("code")

	// initiate the from path url variable
	var pathUrl string = "/"

	// check if the state is present and not empty and assign it to pathUrl
	if ctx.Query("state") != "" {
		pathUrl = ctx.Query("state")
	}

	// check if the code is present and not empty
	if code == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"message": "Authorization code not provided!",
		})
		return
	}

	// with the code now get the id and the access token
	tokenRes, err := utils.GetGoogleOAuthToken(code)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{
			"message": "Failed to get access token!",
			// display error message if debug mode is true using conditional operator, but first encodes the error message to string
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// if token response doesnt have any values
	if tokenRes.AccessToken == "" || tokenRes.IDToken == "" {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Could not get access token from the Google OAuth API!",
		})
		return
	}

	// get the user information using the access token
	userRes, err := utils.GetGoogleOAuthUser(tokenRes.AccessToken, tokenRes.IDToken)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{
			"message": "Failed to get user information from the access token!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// if user response doesnt have any values
	if userRes.Email == "" || userRes.FirstName == "" || userRes.LastName == "" || userRes.Photo == "" {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Could not get user information from the Google OAuth API!",
		})
		return
	}

	// save time as an int
	currentTime := time.Now().Unix()

	resBody := &models.User{
		FirstName: userRes.FirstName,
		LastName:  userRes.LastName,
		Email:     userRes.Email,
		Photo:     userRes.Photo,
		Provider:  "google",
		CreatedAt: currentTime,
		UpdatedAt: currentTime,
	}

	// create a new user repository
	userRepo := repositories.NewUserRepository(db)

	// check if user email already exists
	user, err := userRepo.GetUserByEmail(resBody.Email)

	if user != nil {
		// if the user exists, update the user
		userRepo.DB.Model(&user).Updates(resBody)
	} else {
		// if the user does not exist, create the user
		userRepo.CreateUser(resBody)
	}

	// parse os string token expiration time hours to int
	tokenExpirationHours, err := strconv.Atoi(os.Getenv("TOKEN_EXPIRES_IN_HOURS"))

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to parse token expiration hours!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// generate access and refresh token usign our util method
	access_token, refresh_token, err := utils.GenerateAccessAndRefreshToken(resBody.ID, ctx)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to generate access token!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
			// "type":  errorType,
		})
		return
	}

	// save user session using repository
	sessionRepo := repositories.NewDatabaseSessionStore(db)
	err = sessionRepo.SaveSession(
		// save user id as string
		strconv.Itoa(int(user.ID)),
		access_token,
		refresh_token,
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to save user session!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// add the client domain name to a variable from environment variables
	var domainName string = os.Getenv("CLIENT_ORIGIN_URL")

	// set cookies
	ctx.SetCookie("access_token", access_token, tokenExpirationHours*60*60, "/", domainName, false, true)
	ctx.SetCookie("refresh_token", refresh_token, tokenExpirationHours*60*60, "/", domainName, false, true)
	ctx.SetCookie("logged_in", "true", tokenExpirationHours*60*60, "/", domainName, false, true)

	// redirect to the client url path
	ctx.Redirect(http.StatusTemporaryRedirect, fmt.Sprint(os.Getenv("CLIENT_ORIGIN_URL")+pathUrl))
}

func LogoutController(ctx *gin.Context, db *gorm.DB) {

	// get the refresh token from the cookie
	refreshToken, err := ctx.Cookie("refresh_token")

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to get refresh token from cookie!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// validate the token
	_, err = utils.ValidateJWT(refreshToken)

	// a sample response
	ctx.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged out!",
	})
	return

	// // delete the refresh token from the database
	// sessionRepo := repositories.NewDatabaseSessionStore(db)
	// err = sessionRepo.DeleteSession(refreshToken)

	// if err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{
	// 		"message": "Failed to delete refresh token from database!",
	// 		// display error message if debug mode is true using conditional operator
	// 		"error": utils.ReturnErrorMessageOnDevMode(err),
	// 	})
	// 	return
	// }

	// // delete the refresh token from the cookie
	// ctx.SetCookie("refresh_token", "", -1, "/", os.Getenv("CLIENT_ORIGIN_URL"), false, true)
	// ctx.SetCookie("access_token", "", -1, "/", os.Getenv("CLIENT_ORIGIN_URL"), false, true)
	// ctx.SetCookie("logged_in", "", -1, "/", os.Getenv("CLIENT_ORIGIN_URL"), false, true)

	// // return the response
	// ctx.JSON(http.StatusOK, gin.H{
	// 	"message": "Successfully logged out!",
	// })
}
