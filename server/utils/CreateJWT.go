package utils

import (
	"encoding/base64"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

func CreateJWT(
	ttl time.Duration,
	payload interface{},
	privateKey string,
) (string, error) {
	decodedPrivateKey, err := base64.StdEncoding.DecodeString(privateKey)
	if err != nil {
		return "", err
	}

	// parse the private key
	key, err := jwt.ParseRSAPrivateKeyFromPEM(decodedPrivateKey)
	if err != nil {
		return "", err
	}

	// get current time and add ttl to it
	currentTime := time.Now().UTC()

	// encode the payload and the claims
	claims := make(jwt.MapClaims)
	claims["sub"] = payload
	claims["exp"] = currentTime.Add(ttl).Unix()
	claims["iat"] = currentTime.Unix()
	claims["nbf"] = currentTime.Unix()

	// create the token with the claims and payload
	token, err := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)
	if err != nil {
		return "", err
	}

	// return the signed token
	return token.SignedString(key), nil
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
