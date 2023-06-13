# E-commerce Project

This project is an e-commerce application built with Next.js and Golang Gin.

## Description

The e-commerce project is a full-stack application that allows users to browse and purchase products online. The front-end is developed using Next.js, a popular React framework for server-side rendering and building user interfaces. The back-end is powered by Golang Gin, a lightweight web framework for building APIs and handling business logic.

## Features

- User authentication and registration
- Product browsing and searching
- Shopping cart functionality
- Checkout and payment integration
- Order management
- Admin panel for managing products, orders, and users

## Folder Structure

The e-commerce project consists of a client-side application built with Next.js and a server-side application built with Golang Gin. The client folder contains all the front-end code, including the public assets and source code. The server folder contains the back-end code, organized into various subdirectories.


* client
    * public
    * src
    * (client configuration files)
    
* server
    * common
        * auth
        * utils
        * validators
    * config
    * controllers
    * models
    * routers
    * tests
    * (other server configuration files)
* (docker image setup and other files)

### Client

The client folder contains the client-side application developed with Next.js. This folder structure follows the conventions of Next.js applications and can be customized based on your specific requirements. It includes the public folder for static assets and the src folder for source code files.

### Server

The server folder contains the server-side application developed with Golang Gin. It follows a modular structure to separate concerns and promote code organization. Here's a brief explanation of the subdirectories:

- common: Contains common utilities, authentication-related files, and validation logic.
- config: Includes configuration files for the server application.
- controllers: Contains the handler functions for different API routes and controllers.
- models: Includes data models or structures representing the entities used in the application.
- routers: Contains the routing logic to map incoming requests to the appropriate handlers.
- tests: Includes test files for unit testing and integration testing the server application.

### Docker Image Setup

This section can include information about the Docker image setup and any other relevant files or configurations related to deployment and containerization of the application.

## Contact

For any questions or feedback, please contact nicolas.castellano.6@gmail.com.