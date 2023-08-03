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
	AccessToken string
	Scope       string
	TokenType   string
}

type GithubUser struct {
	Name           string
	Email          string
	Photo          string
	GitHubUsername string
}

func GetGithubOAuthToken(code string) (*GithubOAuthToken, error) {
	// this will return the auth token based on user code

	// create the root oauth api url
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

	// fmt.Println("res: ", res)

	// check for response errors
	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("failed to get oauth token")
	}

	// read the response body and store it in a variable
	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	// parse the response body into a url query
	parsedQuery, err := url.ParseQuery(string(resBody))
	if err != nil {
		return nil, err
	}

	// generate the token
	token := &GithubOAuthToken{
		AccessToken: parsedQuery.Get("access_token"),
		Scope:       parsedQuery.Get("scope"),
		TokenType:   parsedQuery.Get("token_type"),
	}

	return token, nil

}

func GetGithubOAuthUser(access_token string) (*GithubUser, error) {
	// root url for github user
	const rootURL = "https://api.github.com/user"

	// create a new request for getting the user
	req, err := http.NewRequest("GET", rootURL, nil)
	if err != nil {
		return nil, err
	}

	// add headers and timeout to the request
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", access_token))
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

	// we will unmarshal the response body into an any typed map
	var GithubUserRes map[string]interface{}

	if err := json.Unmarshal([]byte(string(resBody)), &GithubUserRes); err != nil {
		return nil, err
	}

	// if email is not public, return "" as email
	if GithubUserRes["email"] == nil {
		GithubUserRes["email"] = ""
	}

	// fmt.Println("email: ", GithubUserRes["email"].(string))
	// fmt.Println("name: ", GithubUserRes["name"].(string))
	// fmt.Println("avatar_url: ", GithubUserRes["avatar_url"].(string))
	// fmt.Println("login: ", GithubUserRes["login"].(string))

	githubUserResult := &GithubUser{
		Name:           GithubUserRes["name"].(string),
		Email:          GithubUserRes["email"].(string),
		Photo:          GithubUserRes["avatar_url"].(string),
		GitHubUsername: GithubUserRes["login"].(string),
	}

	// // parse the response body
	// parsedQuery, err := url.ParseQuery(string(resBody))
	// if err != nil {
	// 	return nil, err
	// }

	// // fmt.Println("parsedQuery: ", parsedQuery)
	// fmt.Println("name: ", parsedQuery.Get("name"))
	// fmt.Println("email: ", parsedQuery.Get("email"))
	// fmt.Println("avatar_url: ", parsedQuery.Get("avatar_url"))
	// fmt.Println("login: ", parsedQuery.Get("login"))

	// // generate the token
	// githubUserResult := &GithubUser{
	// 	Name:           parsedQuery["name"][0],
	// 	Email:          parsedQuery.Get("email"),
	// 	Photo:          parsedQuery.Get("avatar_url"),
	// 	GitHubUsername: parsedQuery.Get("login"),
	// }

	fmt.Println("githubUserResult: ", githubUserResult)
	// fmt.Println("githubUserResult.Email: ", githubUserResult.Email)
	// fmt.Println("githubUserResult.Login: ", githubUserResult.GitHubUsername)

	return githubUserResult, nil
}
