# Use the official Golang image as the base image
FROM golang:1.20-alpine

# Set the working directory inside the container
WORKDIR /server

# Copy the Go module files to the working directory
COPY . ./

# remove the test files
# this will come handy later


# Download the Go module dependencies
RUN go mod tidy
RUN go mod download

# define the environment type
# ENV ENV_TYPE=development
# ENV ENV_TYPE=production

# Build the Go application to make executable binary
RUN go build -o myWebServer


# Set environment variables
# this will come handy later

EXPOSE 8081

# Run the Go application
CMD ["./myWebServer"]