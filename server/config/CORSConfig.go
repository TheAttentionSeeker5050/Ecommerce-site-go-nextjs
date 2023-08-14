package config

import (
	"time"

	"github.com/gin-contrib/cors"
)

func ConfigureCors() cors.Config {
	// CorsConfig.AllowAllOrigins = true
	CorsConfig := cors.DefaultConfig()
	CorsConfig.AllowOrigins = []string{"http://127.0.0.1:3000", "http://127.0.0.1:3001", "http://159.65.225.127:3001", "https://ecommerce-x.alligatorcode.pro", "http://currentdevelopment.local:3000", "http://currentdevelopment.local:3001"} // Replace with your desired allowed origins
	// CorsConfig.AllowAllOrigins = true
	CorsConfig.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	CorsConfig.AllowHeaders = []string{"no-cors", "Origin", "Authorization", "Content-Type", "Content-Length", "Access-Control-Allow-Origin", "Accept"}
	CorsConfig.AllowCredentials = true
	CorsConfig.MaxAge = 12 * time.Hour

	return CorsConfig
}
