package config

import (
	"fmt"
	"os"
	"workspace/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// connect to the database using credentials stored on the .env file

func ConnectDB() (*gorm.DB, error) {
	// first check if the environment is set to development

	// if the environment is set to development, then we will use the development database vars in the development.env file
	var connectionString string = "user=" + os.Getenv("MYSQL_USER") + " password=" + os.Getenv("MYSQL_PASSWORD") + " dbname=" + os.Getenv("MYSQL_DATABASE") + " port=" + os.Getenv("MYSQL_DATABASE_PORT") + " sslmode=disable"

	// print the connection string
	fmt.Println("connstring: ", connectionString)

	// open the connection to the database
	db, err := gorm.Open(mysql.Open(connectionString), &gorm.Config{})

	// run the migrations
	db.AutoMigrate(&models.UserModel{}, &models.AddressModel{}, &models.ProductModel{}, &models.ProductCategoryModel{})

	// return the database connection
	return db, err
}
