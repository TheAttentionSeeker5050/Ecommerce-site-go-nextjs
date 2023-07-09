package utils

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"time"
)

type GithubOAuthToken struct {
	AccessToken string `json:"access_token"`
}

type GithubOAuthUserResult struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Photo string `json:"avatar_url"`
}

func GetGithubOAuthToken(code string) (*GithubOAuthToken, error) {
	// this will return the auth token based on user code
	const rootURL = "https://github.com/login/oauth/access_token"

	// create a url querystring struct
	values := url.Values{}
	values.Add("code", code)
	values.Add("client_id", os.Getenv("GITHUB_OAUTH_CLIENT_ID"))
	values.Add("client_secret", os.Getenv("GITHUB_OAUTH_CLIENT_SECRET"))

	// encode the querystring params
	queryParams := values.Encode()

	// create the full url
	queryString := fmt.Sprintf("%s?%s", rootURL, bytes.NewBufferString(queryParams))

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
		return nil, fmt.Errorf("failed to get oauth token")
	}

	// read the response body and store it in a variable
	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	// parse the response body
	parsedQuery, err := url.ParseQuery(string(resBody))
	if err != nil {
		return nil, err
	}

	// generate the token
	token := &GithubOAuthToken{
		AccessToken: parsedQuery.Get("access_token"),
		// AccessToken: parsedQuery["access_token"][0],
	}

	return token, nil

}

func GetGithubOAuthUser(token string) (*GithubOAuthUserResult, error) {
	// root url for github user
	const rootURL = "https://api.github.com/user"

	// create a new request for getting the user
	req, err := http.NewRequest("GET", rootURL, nil)
	if err != nil {
		return nil, err
	}

	// add headers and timeout to the request
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))
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
		return nil, fmt.Errorf("failed to get oauth user")
	}

	// read the response body and store it in a variable
	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	var githubUser GithubOAuthUserResult

	if err := json.Unmarshal(resBody, &githubUser); err != nil {
		return nil, err
	}

	userBody := &GithubOAuthUserResult{
		Name:  githubUser.Name,
		Email: githubUser.Email,
		Photo: githubUser.Photo,
	}

	return userBody, nil
}
