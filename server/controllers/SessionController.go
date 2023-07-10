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

	// print path url
	fmt.Println(pathUrl)

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

	// save time as an int
	currentTime := time.Now().Unix()

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
	fmt.Println("user:", user)

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
	fmt.Println("token expiration hours:", tokenExpirationHours)

	// token expiration in time.Duration
	tokenExpiration := time.Duration(tokenExpirationHours) * time.Hour
	fmt.Println("token expiration:", tokenExpiration)

	// get private key from env and convert it to string
	// var secretKey string = os.Getenv("ACCESS_TOKEN_PRIVATE_KEY")
	// print type of private key

	// generate token
	access_token, err, errorType := utils.CreateJWT(tokenExpiration, resBody.ID, "secret")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to generate access token!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
			"type":  errorType,
		})
		return
	}

	// secretKey = os.Getenv("REFRESH_TOKEN_PRIVATE_KEY")

	// generate the refresh token
	refresh_token, err, errorType := utils.CreateJWT(time.Duration(tokenExpiration), resBody.ID, "secret")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to generate refresh token!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
			"type":  errorType,
		})
		return
	}

	// set cookies
	ctx.SetCookie("access_token", access_token, tokenExpirationHours*60*60, "/", "localhost", false, true)
	ctx.SetCookie("refresh_token", refresh_token, tokenExpirationHours*60*60, "/", "localhost", false, true)
	ctx.SetCookie("logged_in", "true", tokenExpirationHours*60*60, "/", "localhost", false, true)

	// redirect to the client url path
	ctx.Redirect(http.StatusTemporaryRedirect, fmt.Sprint(os.Getenv("CLIENT_ORIGIN_URL")+pathUrl))

}
