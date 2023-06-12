package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// define the type of environment
	environmentString := os.Getenv("ENVIRONMENT")
	// check for errors
	if environmentString == "" {
		environmentString = "development"
	}

	// define empty error
	// load whatever environment we are in
	if environmentString == "development" {
		gin.SetMode(gin.DebugMode)

	} else {
		gin.SetMode(gin.ReleaseMode)

	}
	// load the environment file
	err := godotenv.Load(fmt.Sprintf("%s.env", environmentString))

	// check for errors
	if err != nil {
		panic(err)
	}
	// Create a new Gin router
	router := gin.Default()

	// Define routes
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, World!",
		})
	})

	// Run the server
	router.Run(":8081")
}
