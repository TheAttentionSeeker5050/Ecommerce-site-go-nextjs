package utils

import (
	"fmt"
	"os"
)

func ReadContentsOfFile(filePath string) (string, error) {
	// this code will read the contents of a file and return it as a string
	// get current working directory
	cwd, err := os.Getwd()

	if err != nil {
		return "", fmt.Errorf("could not get current working directory: %w", err)
	}

	// join current directory with private key file name and save it to screen
	fileFullPath := cwd + filePath

	// read file and decode the private key
	fileContents, err := os.ReadFile(fileFullPath)
	if err != nil {
		return "", fmt.Errorf("could not contents from file: %w", err)
	}

	// return the contents as bit array
	return string(fileContents), nil
}
