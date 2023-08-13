package main

import (
	"fmt"
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

	} else if environmentString == "production" {
		gin.SetMode(gin.ReleaseMode)

	} else {
		panic("Invalid environment string")
	}

	println("----------------------\n", "Server running on", environmentString, "mode", "\n -------------------------------")

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

	// to prevent address collision, we from now on will reverse our backend to be /api instead
	// of /api/v1. Then we will contain all our routes to be under the router group /v1
	// this will make that we do not need to care about repeat addresses on frontend and backend

	v1Routes := router.Group("/v1")

	productRoutes := v1Routes.Group("/products")

	routers.ProductCategoryRouter(productRoutes, db)
	routers.ProductRouter(productRoutes, db)

	routers.ShoppingCartRouter(v1Routes, db)
	
	// define the user router
	routers.UserRouter(v1Routes, db)
	routers.SessionRouter(v1Routes, db)

	// Run the server
	router.Run(":8080")
}
