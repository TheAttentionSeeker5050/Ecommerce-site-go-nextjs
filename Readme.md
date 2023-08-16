# E-commerce Project

This project is an e-commerce application built with Next.js and Golang Gin.

## Description

The e-commerce project allows users to browse and purchase products online. The front-end is developed using Next.js, a popular React framework for server-side rendering and building user interfaces. The back-end is powered by Golang Gin, a lightweight web framework for building APIs and handling business logic. This ecommerce should sell pet supplies.

## Site Demo
You can see this site deployed in here: https://ecommerce-x.alligatorcode.pro/

## Features
- The user can register or authenticate either using local account credentials or one of our allowed OAuth 2.0 Providers (Github and Google) 
- User can browse products by different search methods. On the current version products can be searched by functional category (food, collars, beddings, feeders, etc.), and by pet type (It is a pet shop, so the products can be categorized by the kind of pet they should be used on)
- Products can also be sorted. On current version they can be sorted by price (ascending and descending) and the search results are paginated.
- Users can add products to the shopping cart. The products are stored by default on a redux store. For authenticated users with an open session, the shopping cart can automatically update to and from the database. This will work also for a hard reload of the page (f5), meaning they will still get their shopping cart info. 
- Checkout and payment integration is still not implemented in current version.
- Order management still not implemented in current version.

## Project Structure

The e-commerce project consists of a client-side application built with Next.js and a server-side application built with Golang Gin. They run on separate containers composed using docker compose. The folders are arranged in the following way:

- client
    - public/
    - (client configuration files)
    - src/
        - app/ 
        - components/
        - functions/
            - handlers/
            - validators/
        - data/
            - redux/
                - our redux store reducers and thunks
        - utils/
- server
    - config
    - controllers
    - middlewares
    - models
    - repositories
    - routers
    - tests
    - utils
    - validators
    - (other server configuration files)
    
- docker image setup and other files

### Client

The client folder contains the client-side application developed with Next.js. This folder structure follows the conventions of Next.js applications and can be customized based on your specific requirements. It includes the public folder for static assets and the src folder for source code files. Explanation of the updated project structure:

- src: This is the root directory for your source code.
- pages: This directory contains the app route components for your application. Each page.tsx file within this directory represents a route in your Next.js application. You can create additional pages as needed.
- components: This directory is for reusable UI components and wrappers that are used across multiple pages or sections of your application.
- functions: This directory contains the API-related files and components.
    - handlers: This directory contains the request handlers for different API routes. You can have separate handler files for different entities or resource types (e.g., userHandler.ts, productHandler.ts, etc.).
    - validators: This directory contains the validation functions or modules for input validation. You can have separate validator files for different entities or resource types (e.g., userValidator.ts, productValidator.ts, etc.).
- data: mainly to store redux stuff
- utils: This directory can be used to store utility functions or helper modules that are used throughout your application.



### Server

The server folder contains the server-side application developed with Golang Gin. It follows a modular structure to separate concerns and promote code organization. Here's a brief explanation of the subdirectories:

- config: Includes configuration files for the server application. Cors, Database, JWT config, etc/
- controllers: Contains the handler functions for different API routes and controllers.
- models: Includes data models or structures representing the entities used in the application.
- repositories: This directory contains the database repository implementations for performing CRUD operations on the corresponding models/entities.
- routers: Contains the routing logic to map incoming requests to the appropriate handlers.
- tests: Includes test files for unit testing and integration testing the server application.
- utils: This directory holds utility functions or modules that are used throughout the application, such as JWT authentication and validation helpers.

## How to set up and deploy this site

This section can include information about the Docker image setup and any other relevant files or configurations related to deployment and containerization of the application.

### VM, docker & Ngnix/apache

A complicated, labour intensive but cheap way to deploy this site to the internet. Use a digitalocean droplet, linode, EC2 or other cloud VM of your choosing (which you can use to host other sites as well).

1. Clone this project from github
2. Create private and public keys for JWT implementation and save them to the server root directory. Each OS has a way of doing this. The format should be PEM encoded using RSA algo. Should look something like 


for the private key:
```
-----BEGIN RSA PRIVATE KEY-----
some random large hash string
-----END RSA PRIVATE KEY-----
```
for the public key:
```
-----BEGIN RSA PUBLIC KEY-----
some random large hash string
-----END RSA PUBLIC KEY-----
```

Please make sure that their names are jwtRS256.key (for the private key) and jwtRS256.key.pub (for the public key). if you want to use different names change them in the file: server > utils > JWTMethods.go. There is a method called ReadContentsOfFile("/name_of_key"). Should replace name_of_key with the new name

3. Set up Oauth Ids with both of the providers (github and google). 
4. Build the env file for client. For the client you will uncomment the contents of file: next.config_template.js inside the client folder and use it as a template for your environment variable values. I use _REMOTE and _PROD for the deployed version of the website. If you are going to use a development version, fill your variables on _DEV too.

5. Go to the server folder and configure environment variables there. Use a template file called: template4env. You are free to use either a single .env file for all the variables or serparate them into development.env and production.env. Do what you please but make sure that all .env files (.env, production.env and development.env) are present in your server directory. You can also delete these entries from the docker-compose.yml or production.yml file.
6. Make sure you have all cdn, cors (this one will make trouble on local setup) and oauth config variables set up correctly. If one of these fails, many important features of the site wont work. Also make sure you use the host ip address for the database and the correct port (the port setup as well as the credentials are on the docker-compose files). This will make the db driver crash when starting the server and shut it down completely.
7. Just to make sure, add your site domain to the cors config on the server. Go to server > config > CORSConfig.go.
8. Run the database using either the default docker-compose file on the root of the project or the production.yml file.
9. Set up reverse proxy on nginx or apache and domain registrar if needed.
10. You're done

## Contact

For any questions or feedback, please contact nicolas.castellano.6@gmail.com.