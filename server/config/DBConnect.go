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
	// it should be in the format of:
	// "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
	var connectionString string = os.Getenv("MYSQL_USER") + ":" + os.Getenv("MYSQL_PASSWORD") + "@tcp(" + os.Getenv("MYSQL_HOST") + ":" + os.Getenv("MYSQL_PORT") + ")/" + os.Getenv("MYSQL_DATABASE") + "?charset=utf8mb4&parseTime=True&loc=Local"

	// print the connection string
	fmt.Println("connstring: ", connectionString)

	// open the connection to the database
	db, err := gorm.Open(mysql.Open(connectionString), &gorm.Config{})

	// print database connection and error
	fmt.Println("db: ", db, "err: ", err)

	// run the migrations
	db.AutoMigrate(
		&models.Address{},
		&models.User{},
		// &models.Wishlist{},
		// &models.ProductCategory{},
		// &models.Product{},
		// &models.ProductUnit{},
		// &models.ShoppingCartItem{},
		// &models.OnSalePromo{},
		// &models.OnSalePromoItem{},
		// &models.Order{},
		// &models.OrderItem{},
		// &models.Metadata{},
	)

	// return the database connection
	return db, err
}
