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

func GitHubAuthController(c *gin.Context, db *gorm.DB) {
	// get the code from the query string
	code := c.Query("code")

	// initiate the from path url variable
	var pathUrl string = "/"

	var oauthLoginFailed string = "/login/failed"

	// check if the state is present and not empty and assign it to pathUrl
	if c.Query("state") != "" {
		pathUrl = c.Query("state")
	}

	// check if the code is present and not empty
	if code == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Authorization code not provided!",
		})
		return
	}

	// with the code now get the id and the access token
	tokenRes, err := utils.GetGithubOAuthToken(code)

	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"message": "Failed to get access token!",
			// display error message if debug mode is true using conditional operator, but first encodes the error message to string
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// if token response doesnt have any values
	if tokenRes.AccessToken == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Could not get access token from the Github OAuth API!",
		})
		return
	}

	// get the user information using the access token
	userRes, err := utils.GetGithubOAuthUser(tokenRes.AccessToken)

	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"message": "Failed to get user information from the access token!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// if user response doesnt have any values
	if userRes.Name == "" || userRes.Photo == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Could not get user information from the Github OAuth API!",
		})
		return
	}

	// save time as an int
	currentTime := time.Now().Unix()

	// name a var email not provided if email is not provided as boolean, true if email value start with no_email__ and false if email value does not start with no_email__
	var emailNotProvided bool = userRes.Email == ""

	var email string = userRes.Email
	// var needs_email_update bool = false
	if emailNotProvided == true {
		email = "no_email__" + userRes.GitHubUsername + "@githubtemp.com"
	}

	// create a new user struct for the github user
	resBody := &models.User{
		FirstName:        userRes.Name,
		LastName:         "",
		Email:            email,
		NeedsEmailUpdate: emailNotProvided,
		Photo:            userRes.Photo,
		Provider:         "github",
		CreatedAt:        currentTime,
		UpdatedAt:        currentTime,
		GitHubUsername:   userRes.GitHubUsername,
	}

	userRepo := repositories.NewUserRepository(db)
	// check if user email already exists
	user, err := userRepo.GetUserByGithubUsername(resBody.GitHubUsername)

	if user != nil {
		// if the user is registered using a different provider, redirect to error page
		if user.Provider != "github" {
			c.Redirect(http.StatusTemporaryRedirect, fmt.Sprint(os.Getenv("CLIENT_ORIGIN_URL")+oauthLoginFailed+"?error=email-already-exists"))
			return
		}

		// if the retrieved user already changed email, then change needs email update to false
		if user.NeedsEmailUpdate == false {
			emailNotProvided = false
		}
		
	} else {
		// if the user does not exist, create the user
		user, err = userRepo.CreateUser(resBody)
	}

	// bind the found user to the user struct

	// parse os string token expiration time hours to int
	tokenExpirationHours, err := strconv.Atoi(os.Getenv("TOKEN_EXPIRES_IN_HOURS"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to parse token expiration hours!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// build the token claims payload struct
	tokenPayload := utils.TokenClaims{
		// convert user id into string
		ID:        strconv.Itoa(int(user.ID)),
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Provider:  user.Provider,
		GitHubUsername: user.GitHubUsername,
	}

	// generate access and refresh token usign our util method
	access_token, refresh_token, err := utils.GenerateAccessAndRefreshToken(tokenPayload, c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Failed to generate access token!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
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
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to save user session!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// add the client domain name to a variable from environment variables
	var domainName string = os.Getenv("CLIENT_ORIGIN_URL")

	// set cookies
	c.SetCookie("access_token", access_token, tokenExpirationHours*60*60, "/", domainName, false, true)
	c.SetCookie("refresh_token", refresh_token, tokenExpirationHours*60*60, "/", domainName, false, true)
	c.SetCookie("logged_in", "true", tokenExpirationHours*60*60, "/", domainName, false, true)

	const redirectEmailNotProvided string = "/account/update-email"

	// if email is not provided, redirect to the update email page
	if emailNotProvided {
		c.Redirect(http.StatusTemporaryRedirect, fmt.Sprint(os.Getenv("CLIENT_ORIGIN_URL")+redirectEmailNotProvided))
		return
	} else {
		// redirect to the client default url login success path if email is provided
		c.Redirect(http.StatusTemporaryRedirect, fmt.Sprint(os.Getenv("CLIENT_ORIGIN_URL")+pathUrl))
		return
	}
}

func GoogleAuthController(c *gin.Context, db *gorm.DB) {

	// get the code from the query string
	code := c.Query("code")

	// initiate the from path url variable
	var pathUrl string = "/"

	var oauthLoginFailed string = "/login/failed"

	// check if the state is present and not empty and assign it to pathUrl
	if c.Query("state") != "" {
		pathUrl = c.Query("state")
	}

	// check if the code is present and not empty
	if code == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "Authorization code not provided!",
		})
		return
	}

	// with the code now get the id and the access token
	tokenRes, err := utils.GetGoogleOAuthToken(code)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"message": "Failed to get access token!",
			// display error message if debug mode is true using conditional operator, but first encodes the error message to string
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// if token response doesnt have any values
	if tokenRes.AccessToken == "" || tokenRes.IDToken == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Could not get access token from the Google OAuth API!",
		})
		return
	}

	// get the user information using the access token
	userRes, err := utils.GetGoogleOAuthUser(tokenRes.AccessToken, tokenRes.IDToken)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{
			"message": "Failed to get user information from the access token!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// if user response doesnt have any values
	if userRes.FirstName == "" || userRes.LastName == "" || userRes.Photo == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
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
		// if the user is registered using a different provider, redirect to error page
		if user.Provider != "google" {
			c.Redirect(http.StatusTemporaryRedirect, fmt.Sprint(os.Getenv("CLIENT_ORIGIN_URL")+oauthLoginFailed+"?error=email-already-exists"))
			return
		}
	} else {
		// if the user does not exist, create the user
		user, _ = userRepo.CreateUser(resBody)
	}

	// parse os string token expiration time hours to int
	tokenExpirationHours, err := strconv.Atoi(os.Getenv("TOKEN_EXPIRES_IN_HOURS"))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to parse token expiration hours!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// build the token claims payload struct
	tokenPayload := utils.TokenClaims{
		// convert user id into string
		ID:        strconv.Itoa(int(user.ID)),
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Provider:  user.Provider,
	}

	// generate access and refresh token usign our util method
	access_token, refresh_token, err := utils.GenerateAccessAndRefreshToken(tokenPayload, c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
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
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to save user session!",
			// display error message if debug mode is true using conditional operator
			"error": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// add the client domain name to a variable from environment variables
	var domainName string = os.Getenv("COOKIE_DOMAIN")

	// set cookies
	c.SetCookie("access_token", access_token, tokenExpirationHours*60*60, "/", domainName, false, true)
	c.SetCookie("refresh_token", refresh_token, tokenExpirationHours*60*60, "/", domainName, false, true)
	c.SetCookie("logged_in", "true", tokenExpirationHours*60*60, "/", domainName, false, true)

	// redirect to the client url path
	c.Redirect(http.StatusTemporaryRedirect, fmt.Sprint(os.Getenv("CLIENT_ORIGIN_URL")+pathUrl))
}

func LogoutController(c *gin.Context, db *gorm.DB) {

	// get the refresh token from the cookie
	refreshToken, err := c.Cookie("refresh_token")

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Failed to get refresh token from cookie",
			// display error message if debug mode is true using conditional operator
			"error-type": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// delete the refresh token from the database
	sessionRepo := repositories.NewDatabaseSessionStore(db)
	err = sessionRepo.DeleteSession(refreshToken)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to delete the session from the database",
			// display error message if debug mode is true using conditional operator
			"error-type": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	cookieDomain := os.Getenv("COOKIE_DOMAIN")

	// delete the refresh token from the cookie
	c.SetCookie("refresh_token", "", -1, "/", cookieDomain, false, true)
	c.SetCookie("access_token", "", -1, "/", cookieDomain, false, true)
	c.SetCookie("logged_in", "", -1, "/", cookieDomain, false, true)

	// return the response
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged out!",
	})
}
