package utils

import (
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// make structure for the token claims
type TokenClaims struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Provider  string `json:"provider"`
}

// map[CreatedAt:0001-01-01T00:00:00Z DeletedAt:<nil> ID:0 UpdatedAt:0001-01-01T00:00:00Z created_at:1.691109193e+09 email:user3@name.com first_name:user3 id:14 last_name:name middle_name:m password:$2a$10$bkmkH9n306yv15KLclYWCu24264IdsU1XMsnjouDd1IoqcwR5oHnK phone:3333333333 photo: preferred_address:0 provider: role:customer updated_at:1.691109193e+09]

func CreateJWT(
	ttl time.Duration,
	payload TokenClaims,
) (string, error) {

	// read file using the file utils
	key, err := ReadContentsOfFile("/jwtRS256.key")
	if err != nil {
		return "", err
	}

	parsedPrivateKey, err := jwt.ParseRSAPrivateKeyFromPEM([]byte(key))
	if err != nil {
		return "", fmt.Errorf("could not parse key: %w", err)
	}

	now := time.Now().UTC()

	claims := make(jwt.MapClaims)
	claims["sub"] = payload
	claims["exp"] = now.Add(ttl).Unix()
	claims["iat"] = now.Unix()
	claims["nbf"] = now.Unix()

	token, err := jwt.NewWithClaims(jwt.SigningMethodRS256, claims).SignedString(parsedPrivateKey)
	if err != nil {
		return "", fmt.Errorf("create: sign token: %w", err)
	}
	// fmt.Println("token:", token)

	return token, nil

}

func ValidateJWT(
	tokenString string,
	// publicKey string,
) (TokenClaims, error) {

	// verify if the token is empty
	if tokenString == "" {
		return TokenClaims{}, fmt.Errorf("ValidateJWT error: Token param is empty")
	}

	// read file using the file utils
	key, err := ReadContentsOfFile("/jwtRS256.key.pub")
	if err != nil {
		return TokenClaims{}, fmt.Errorf("could not read contents of file: %w", err)
	}

	// verify if the key is empty
	if key == "" {
		return TokenClaims{}, fmt.Errorf("ValidateJWT error: Key is empty")
	}

	// parse the public key
	parsedPublicKey, err := jwt.ParseRSAPublicKeyFromPEM([]byte(key))
	if err != nil {
		return TokenClaims{}, fmt.Errorf("could not parse key: %w", err)
	}

	// validate if the parsePublicKey is empty
	if parsedPublicKey == nil {
		return TokenClaims{}, fmt.Errorf("ValidateJWT error: Parsed public key is empty")
	}

	// parse the token
	parsedToken, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// if the token is not valid add error to err variable
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		// if it is valid return the parsed token and assign it to var
		return parsedPublicKey, nil
	})

	// if parsed token is empty return error
	if parsedToken == nil {
		return TokenClaims{}, fmt.Errorf("ValidateJWT error: Parsed token is empty")
	}

	if err != nil {
		return TokenClaims{}, err
	}

	// check if the token is valid
	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if !ok || !parsedToken.Valid {
		return TokenClaims{}, fmt.Errorf("ValidateJWT error: Could not get token claims from parsed token")
	}

	// print the claims to see the contents of it
	// fmt.Println("the claims from middleware:", claims)

	// a try catch block to catch any errors

	// bind the claims to the TokenClaims struct
	var tokenClaims TokenClaims
	if subClaims, ok := claims["sub"].(map[string]interface{}); ok {
		if id, ok := subClaims["id"].(string); ok {
			tokenClaims.ID = id
		}
		if email, ok := subClaims["email"].(string); ok {
			tokenClaims.Email = email
		}
		if firstName, ok := subClaims["first_name"].(string); ok {
			tokenClaims.FirstName = firstName
		}
		if lastName, ok := subClaims["last_name"].(string); ok {
			tokenClaims.LastName = lastName
		}
		if provider, ok := subClaims["provider"].(string); ok {
			tokenClaims.Provider = provider
		}
	} else {
		return TokenClaims{}, fmt.Errorf("Invalid 'sub' claim format, the claims as a string: %v", claims["sub"])
	}

	// return the claims
	return tokenClaims, nil
}

func GenerateAccessAndRefreshToken(
	userPayload TokenClaims,
	c *gin.Context,
) (
	access_token string,
	refresh_token string,
	err error,
) {
	// parse os string token expiration time hours to int
	tokenExpirationHours, err := strconv.Atoi(os.Getenv("TOKEN_EXPIRES_IN_HOURS"))
	if err != nil {
		return "", "", err
	}

	// fmt.Println("token expiration hours:", tokenExpirationHours)
	// fmt.Println("user payload:", userPayload)

	// if user payload is empty return error
	if userPayload == (TokenClaims{}) {
		return "", "", fmt.Errorf("GenerateAccessAndRefreshToken error: User payload is empty")
	}

	tokenExpiration := time.Duration(tokenExpirationHours) * time.Hour

	// fmt.Println("token expiration:", tokenExpiration)

	// generate access token
	access_token, err2 := CreateJWT(tokenExpiration, userPayload)
	if err2 != nil {
		return "", "", err2
	}

	// generate the refresh token
	refresh_token, err3 := CreateJWT(tokenExpiration, userPayload)
	if err3 != nil {
		return "", "", err3
	}

	// return the access token and refresh token
	return access_token, refresh_token, nil
}
