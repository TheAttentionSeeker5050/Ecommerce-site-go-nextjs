package utils

import (
	"encoding/base64"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func CreateJWT(
	ttl time.Duration,
	payload interface{},
	privateKey string,
) (string, error) {

	// get current working directory
	cwd, err := os.Getwd()
	if err != nil {
		return "", fmt.Errorf("could not get current working directory: %w", err)
	}
	fmt.Println("current working directory:", cwd)

	// join current directory with private key file name and save it to screen
	privateKeyPath := cwd + "/jwtRS256"
	// privateKeyPath := cwd + "/private_key"
	fmt.Println("private key path:", privateKeyPath)

	// read file and decode the private key

	key, err := os.ReadFile(privateKeyPath)
	if err != nil {
		return "", fmt.Errorf("could not read key from file: %w", err)
	}
	fmt.Println("raw private key:", key[0:25])

	// decodedPrivateKey, err := base64.StdEncoding.DecodeString(string(key))
	// if err != nil {
	// 	return "", fmt.Errorf("could not decode key: %w", err)
	// }
	// fmt.Println("decoded private key:", decodedPrivateKey[0:25])

	// // parse the private key
	// parsedPrivateKey, err := jwt.ParseRSAPrivateKeyFromPEM(decodedPrivateKey)
	parsedPrivateKey, err := jwt.ParseRSAPrivateKeyFromPEM(key)
	if err != nil {
		return "", fmt.Errorf("could not parse key: %w", err)
	}
	// fmt.Println("parsed private key:", parsedPrivateKey)

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
	fmt.Println("token:", token)

	return token, nil

}

func ValidateJWT(
	tokenString string,
	publicKey string,
) (interface{}, error) {
	// decode the public key
	decodedPublicKey, err := base64.StdEncoding.DecodeString(publicKey)
	if err != nil {
		return nil, err
	}

	// parse the public key
	parsedPublicKey, err := jwt.ParseRSAPublicKeyFromPEM(decodedPublicKey)
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

	// return the claims
	return claims["sub"], nil

}
