package utils

import (
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func CreateJWT(
	ttl time.Duration,
	payload interface{},
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
) (interface{}, error) {
	// read file using the file utils
	key, err := ReadContentsOfFile("/jwtRS256.key.pub")
	if err != nil {
		return "", err
	}

	// parse the public key
	parsedPublicKey, err := jwt.ParseRSAPublicKeyFromPEM([]byte(key))
	if err != nil {
		return nil, err
	}

	// parse the token
	parsedToken, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// if the token is not valid add error to err variable
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("Invalid signing method")
		}
		// if it is valid return the parsed token and assign it to var
		return parsedPublicKey, nil
	})

	if err != nil {
		return nil, err
	}

	// check if the token is valid
	claims, ok := parsedToken.Claims.(jwt.MapClaims)
	if !ok || !parsedToken.Valid {
		return nil, fmt.Errorf("Invalid token")
	}

	// print all claims
	fmt.Println("token claims:", claims)

	// return the claims
	return claims["sub"], nil
}

func GenerateAccessAndRefreshToken(
	userPayload interface{},
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

	tokenExpiration := time.Duration(tokenExpirationHours) * time.Hour

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
