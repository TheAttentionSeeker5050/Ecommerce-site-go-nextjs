package main

import (
	"fmt"
	"net/http"
	"os"
	"workspace/config"
	"workspace/routers"

	"github.com/gin-contrib/cors"
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

	// run the database connection
	db, err := config.ConnectDB()

	// close the database connection
	if err != nil {
		panic(err)
	} else {
		fmt.Println("Successfully connected to database")
		mysqlDB, _ := db.DB()
		defer mysqlDB.Close()
	}

	// Create a new Gin router
	router := gin.Default()

	// add cors configuration
	router.Use(cors.New(config.ConfigureCors()))
	// fmt.Println("Successfully loaded CORS configuration")
	// fmt.Println(config.ConfigureCors())

	// Define routes
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, World!",
		})
	})

	// define the user router
	routers.UserRouter(router, db)

	// Run the server
	router.Run(":8080")
}
