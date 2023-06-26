package tests

import (
	"fmt"
	"log"
	"testing"
	"workspace/models"

	_ "github.com/go-sql-driver/mysql"
	"github.com/ory/dockertest/v3"
	"github.com/ory/dockertest/v3/docker"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	db       *gorm.DB
	pool     *dockertest.Pool
	resource *dockertest.Resource
)

func TestMain(m *testing.M) {
	// Create a Docker pool
	pool, err := dockertest.NewPool("")
	if err != nil {
		log.Fatalf("Could not connect to Docker: %s", err)
	}
	port := "51484"
	// Run MySQL container
	resource, err = pool.RunWithOptions(&dockertest.RunOptions{
		Repository: "mysql",
		Tag:        "8",
		Env: []string{
			"MYSQL_ROOT_PASSWORD=root",
			"MYSQL_DATABASE=test_db",
			"MYSQL_USER=test_user",
			"MYSQL_PASSWORD=test_password",
		},
		ExposedPorts: []string{"3306/tcp"},
		PortBindings: map[docker.Port][]docker.PortBinding{
			"3306/tcp": {{HostIP: "", HostPort: port}},
		},
	})
	if err != nil {
		log.Fatalf("Could not start MySQL container: %s", err)
	}

	// Wait for the MySQL container to be ready
	if err := pool.Retry(func() error {
		var err error

		dsn := fmt.Sprintf("test_user:test_password@(127.0.0.1:%s)/test_db?charset=utf8mb4&parseTime=True&loc=Local&multiStatements=true", port)
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Silent),
		})
		if err != nil {
			return err
		}
		return db.Exec("CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), email VARCHAR(255), password VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255))").Error
	}); err != nil {
		log.Fatalf("Could not connect to MySQL container: %s", err)
	}

	// perform automigrate
	db.AutoMigrate(&models.User{})

	// Run the tests
	m.Run()

	// Close the database connection
	if sqlDB, err := db.DB(); err == nil {
		if err := sqlDB.Close(); err != nil {
			log.Fatalf("Error closing database connection: %s", err)
		}
	}

	// Cleanup resources
	if err := pool.Purge(resource); err != nil {
		log.Fatalf("Could not purge resource: %s", err)
	}

	log.Println("All tests finished successfully!")
}

func TestMySQLConnection(t *testing.T) {
	// Perform your MySQL tests here
	// verify that we could connect to the database
	if err := db.Exec("SELECT 1").Error; err != nil {
		t.Errorf("Could not connect to database: %s", err)
	}

}
