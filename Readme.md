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


- client
    - public/
    - (client configuration files)
    - src/
        - pages/
        - components/
        - api/
            - handlers/
            - middlewares/
            - validators/
        - routes/
        - utils/
        - types/
            - index.ts
        - App.tsx
        - index.tsx

    
    
* server
    * auth
    * config
    * controllers
    * models
    * repositories
    * routers
    * scripts
    * tests
    * utils
    * validators
    * (other server configuration files)
* (docker image setup and other files)

### Client

The client folder contains the client-side application developed with Next.js. This folder structure follows the conventions of Next.js applications and can be customized based on your specific requirements. It includes the public folder for static assets and the src folder for source code files. Explanation of the updated project structure:

- src: This is the root directory for your source code.
- pages: This directory contains the page components for your application. Each .tsx file within this directory represents a page in your Next.js application. You can create additional pages as needed.
- components: This directory is for reusable UI components that are used across multiple pages or sections of your application.
- api: This directory contains the API-related files and components.
    - handlers: This directory contains the request handlers for different API routes. You can have separate handler files for different entities or resource types (e.g., userHandler.ts, productHandler.ts, etc.).
    - middlewares: This directory contains the middleware functions for handling common tasks such as authentication, input validation, error handling, etc.
    - validators: This directory contains the validation functions or modules for input validation. You can have separate validator files for different entities or resource types (e.g., userValidator.ts, productValidator.ts, etc.).
- routes: This directory contains the route configuration files for mapping URLs to their respective handlers. The index.ts file can serve as the main entry point for defining and exporting the routes.
- utils: This directory can be used to store utility functions or helper modules that are used throughout your application.
- types: This directory can be used to define TypeScript type declarations for your application. The index.ts file can serve as a central place to export all your custom type definitions.
- App.tsx: This is the main component that serves as the entry point for your Next.js application. It typically includes the layout structure and wraps around the pages.
- index.tsx: This is the file responsible for rendering the Next.js application and mounting it into the HTML document.


### Server

The server folder contains the server-side application developed with Golang Gin. It follows a modular structure to separate concerns and promote code organization. Here's a brief explanation of the subdirectories:

- auth: This directory holds the authentication-related functionalities, such as authentication and authorization logic.
- config: Includes configuration files for the server application.
- controllers: Contains the handler functions for different API routes and controllers.
- models: Includes data models or structures representing the entities used in the application.
- repositories: This directory contains the database repository implementations for performing CRUD operations on the corresponding models/entities.
- routers: Contains the routing logic to map incoming requests to the appropriate handlers.
- scripts: This directory can contain any custom scripts or helper tools specific to your application.
- tests: Includes test files for unit testing and integration testing the server application.
- utils: This directory holds utility functions or modules that are used throughout the application, such as JWT authentication and validation helpers.

**Note:** other folders can be db migrations, public (or static), etc, but we will see.

### Docker Image Setup

This section can include information about the Docker image setup and any other relevant files or configurations related to deployment and containerization of the application.

## Contact

For any questions or feedback, please contact nicolas.castellano.6@gmail.com.