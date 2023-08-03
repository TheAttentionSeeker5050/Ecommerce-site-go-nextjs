package utils

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"time"
)

type GoogleOauthToken struct {
	AccessToken string
	IDToken     string
}

type GoogleUserResult struct {
	ID            string
	Email         string
	VerifiedEmail bool
	FirstName     string
	LastName      string
	Photo         string
	Locale        string
}

func GetGoogleOAuthToken(code string) (*GoogleOauthToken, error) {
	// this function will return the auth token based on user code

	// create the root oauth api url
	const rootURl = "https://oauth2.googleapis.com/token"

	// create a url querystring struct
	values := url.Values{}
	values.Add("grant_type", "authorization_code")
	values.Add("code", code)
	values.Add("client_id", os.Getenv("GOOGLE_OAUTH_CLIENT_ID"))
	values.Add("client_secret", os.Getenv("GOOGLE_OAUTH_CLIENT_SECRET"))
	values.Add("redirect_uri", os.Getenv("GOOGLE_OAUTH_REDIRECT_URL"))

	fmt.Println(values)

	// encode the querystring params
	queryParams := values.Encode()

	// create the full url
	queryString := fmt.Sprintf("%s?%s", rootURl, bytes.NewBufferString(queryParams))

	// create a new request
	req, err := http.NewRequest("POST", queryString, nil)
	if err != nil {
		return nil, err
	}

	// add headers and timeout to the request
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	client := http.Client{
		Timeout: time.Second * 20,
	}

	// perform the request
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	// check for response errors
	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("could not get oauth token: %s", res.Status)
	}

	// decode the response body into a struct resBody
	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	// parse the response body into a url query
	resQuery, err := url.ParseQuery(string(resBody))
	if err != nil {
		return nil, err
	}

	// create a new GoogleOauthToken struct
	GoogleOauthToken := &GoogleOauthToken{
		AccessToken: resQuery.Get("access_token"),
		IDToken:     resQuery.Get("id_token"),
	}

	// return the GoogleOauthToken struct
	return GoogleOauthToken, nil

}

func GetGoogleOAuthUser(access_token string, id_token string) (*GoogleUserResult, error) {
	// root url for requesting github user
	rootURL := fmt.Sprintf("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=%s", access_token)

	// create a new request for getting the user
	req, err := http.NewRequest("GET", rootURL, nil)
	if err != nil {
		return nil, err
	}

	// add headers and timeout to the request
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", id_token))

	client := http.Client{
		Timeout: time.Second * 30,
	}

	// perform the request
	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	// check for response errors
	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to get oauth user %v", res.Status)
	}

	// read the response body and store it in a variable
	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	// parse the response body into a url query
	parseQuery, err := url.ParseQuery(string(resBody))
	if err != nil {
		return nil, err
	}

	// create a new GoogleUserResult struct
	GoogleUserResult := &GoogleUserResult{
		ID:            parseQuery.Get("id"),
		Email:         parseQuery.Get("email"),
		VerifiedEmail: parseQuery.Get("verified_email") == "true",
		FirstName:     parseQuery.Get("given_name"),
		LastName:      parseQuery.Get("family_name"),
		Photo:         parseQuery.Get("picture"),
		Locale:        parseQuery.Get("locale"),
	}

	// return the GoogleUserResult struct
	return GoogleUserResult, nil
}
