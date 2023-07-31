// this file handles all the user controller functionality for the user API routes

package controllers

import (
	"fmt"
	"net/http"
	"workspace/config"
	"workspace/models"
	"workspace/repositories"
	"workspace/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/go-github/github"
	"golang.org/x/oauth2"

	// "golang.org/x/oauth2/github"
	"gorm.io/gorm"

	// session stuff
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
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
	err = GetAccessAndRefreshToken(user, c)
	if err != nil {
		c.JSON(500, gin.H{
			"error":     "Failed to create access token",
			"errorType": utils.ReturnErrorMessageOnDevMode(err),
		})
		return
	}

	// c.SetCookie("accessToken", "accessToken", 3600, "/", "currentdevelopment.local", false, true)
	// c.SetCookie("accessToken", "accessToken", 3600, "/", "localhost", false, true)
	c.SetCookie("accessToken", "fghdethyftgjhdgyhjfgyhjgfyj", 3600, "/", "", false, false)

	// c.SetCookie("accessToken", "accessToken", 3600, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully logged in",
	})
	return
}

func AuthCallbackController(
	c *gin.Context,
	db *gorm.DB,
) {
	// Retrieve the authorization code from the query parameters
	code := c.Query("code")

	// Exchange the authorization code for an access token
	token, err := config.GithubOauthConfig.Exchange(oauth2.NoContext, code)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to exchange code for token"})
		return
	}

	fmt.Println("token:", token)

	// Create a GitHub client using the access token
	client := github.NewClient(config.GithubOauthConfig.Client(oauth2.NoContext, token))

	// Fetch user information using the GitHub client
	user, _, err := client.Users.Get(oauth2.NoContext, "")
	if err != nil {
		fmt.Println("error:", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to fetch user information"})
		return
	}

	fmt.Println("user:", user)

	// Perform further actions with the user information or store it as needed
	// save the user information to the database using the user session model repository
	err = repositories.NewDatabaseSessionStore(db).SaveSession(
		fmt.Sprint(*user.ID),
		*user.Email,
		token.AccessToken,
	)
	if err != nil {
		fmt.Println("error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":    "Failed to save user session",
			"errorMsg": err.Error(),
		})
		return
	}

	// return response with access token
	// c.JSON(http.StatusOK, gin.H{"message": "Successfully authenticated user", "accessToken": token.AccessToken})

	// store the token on the client session ------------------------
	// create a cookie store
	store := cookie.NewStore([]byte("secret"))

	// max session age of 12 hours as an int
	maxAge := int(12 * time.Hour)
	// set the session options
	store.Options(sessions.Options{
		// max age 12 hours
		MaxAge: maxAge,
		Path:   "/",
	})

	// initialize the session
	session := sessions.Default(c)
	session.Options(sessions.Options{
		MaxAge: maxAge,
		Path:   "/",
	})

	// store the token on the session
	session.Set("accessToken", token.AccessToken)
	session.Save()

	// set the session id as a cookie
	sessionID := session.ID()
	c.SetCookie("sessionID", sessionID, maxAge, "/", "localhost", false, true)

	// redirect to main page
	c.Redirect(http.StatusFound, "http://127.0.0.1:3001/")

}
