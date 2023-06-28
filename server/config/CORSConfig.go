package config

import (
	"github.com/gin-contrib/cors"
)

func ConfigureCors() cors.Config {
	CorsConfig := cors.DefaultConfig()
	CorsConfig.AllowOrigins = []string{"http://127.0.0.1:3000", "http://127.0.0.1:3001", "http://localhost:3000", "http://localhost:3001"} // Replace with your desired allowed origins
	CorsConfig.AllowAllOrigins = true
	CorsConfig.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	CorsConfig.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization", "Accept"}
	return CorsConfig
}
