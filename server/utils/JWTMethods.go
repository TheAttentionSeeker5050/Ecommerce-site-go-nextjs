package utils

import (
	"encoding/base64"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

func CreateJWT(
	ttl time.Duration,
	payload interface{},
	privateKey string,
) (string, error, string) {

	var sampleSecretKey = []byte("SecretYouShouldHide")

	// formattedSecretKey, err := jwt.ParseRSAPrivateKeyFromPEM(sampleSecretKey)
	// if err != nil {
	// 	return "", err, "error on parsing private key"
	// }

	// use a pkcs8 formatted private key
	token := jwt.New(jwt.SigningMethodES256)

	// current time and store it in a variable
	currentTime := time.Now().UTC()

	// encode the payload and the claims
	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = payload
	claims["exp"] = currentTime.Add(ttl).Unix()
	claims["iat"] = currentTime.Unix()
	claims["nbf"] = currentTime.Unix()

	// create the token with the claims and payload
	signedToken, err := token.SignedString(sampleSecretKey)
	if err != nil {
		return "", err, "error on creating token"
	}

	return signedToken, nil, ""

	// // -------------------------------------
	// var (
	// 	privateKeyRSA *rsa.PrivateKey
	// 	token         *jwt.Token
	// 	signedToken   string
	// )

	// // decode the private key from base64
	// privateKeyBytes, err := base64.URLEncoding.DecodeString(privateKey)
	// if err != nil {
	// 	return "", err, "error on decoding private key"
	// }

	// // parse the private key from pem file
	// privateKeyRSA, err = jwt.ParseRSAPrivateKeyFromPEM(privateKeyBytes)
	// if err != nil {
	// 	return "", err, "error on parsing private key"
	// }

	// // get current time and add ttl to it
	// currentTime := time.Now().UTC()

	// // encode the payload and the claims
	// claims := make(jwt.MapClaims)
	// claims["sub"] = payload
	// claims["exp"] = currentTime.Add(ttl).Unix()
	// claims["iat"] = currentTime.Unix()
	// claims["nbf"] = currentTime.Unix()

	// // create the token with the claims and payload
	// token = jwt.NewWithClaims(jwt.SigningMethodRS256, claims)

	// signedToken, err = token.SignedString(privateKeyRSA)
	// if err != nil {
	// 	return "", err, "error on creating token"
	// }

	// // return the signed token
	// return signedToken, nil, ""
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
