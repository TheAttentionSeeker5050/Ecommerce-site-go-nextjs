package config

import (
	"time"

	"github.com/gin-contrib/cors"
)

func ConfigureCors() cors.Config {
	// CorsConfig.AllowAllOrigins = true
	CorsConfig := cors.DefaultConfig()
	CorsConfig.AllowOrigins = []string{"http://127.0.0.1:3000", "http://127.0.0.1:3001", "http://64.225.57.224:3001", "https://ecommerce-x.alligatorcode.pro"} // Replace with your desired allowed origins
	CorsConfig.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	// CorsConfig.AllowHeaders = []string{"Origin", "Authorization", "Content-Type", "Content-Length", "Access-Control-Allow-Origin", "Accept"}
	CorsConfig.AllowHeaders = []string{"Content-Type", "Authorization", "X-Requested-With"}
	CorsConfig.AllowCredentials = true
	CorsConfig.MaxAge = 12 * time.Hour

	return CorsConfig
}
