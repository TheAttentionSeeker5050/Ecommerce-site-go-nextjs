
# E-Commerce Server

This is the server component of an E-Commerce application built using GoLang and the Gin framework. It provides a RESTful API for managing products, users, and orders.

## Features

- Create, retrieve, update, and delete products
- Register and authenticate users
- Manage user carts and place orders
- Manage inventory internally

## Installation

1. Make sure you have Go installed. If not, refer to the [official Go installation guide](https://golang.org/doc/install) for instructions.

2. Clone the repository:

   ```shell
   git clone https://github.com/your-username/e-commerce-server.git
   ```

3. Navigate to the project directory:

   ```shell
   cd e-commerce-server
   ```

4. Install the dependencies:

   ```shell
   go mod download
   ```

5. Set up the configuration:

   - Rename the `config/config.example.go` file to `config/config.go`.
   - Update the database connection details and other configuration settings in the `config.go` file.

6. Start the server:

   ```shell
   go run main.go
   ```

   or 

   ```shell
   go run .
   ```

   The server will be running at `http://localhost:8080`.

## API Endpoints

The following API endpoints are available:

- **Products**
  - `GET /products`: Get a list of all products.
  - `GET /products/{id}`: Get details of a specific product.
  - `POST /products`: Create a new product.
  - `PUT /products/{id}`: Update details of a specific product.
  - `DELETE /products/{id}`: Delete a specific product.
- **Users**
  - `POST /users/register`: Register a new user.
  - `POST /users/login`: User login.
  - `GET /users/profile`: Get user profile information.
- **Carts**
  - `GET /carts`: Get user's cart items.
  - `POST /carts`: Add a product to the cart.
  - `PUT /carts/{id}`: Update the quantity of a product in the cart.
  - `DELETE /carts/{id}`: Remove a product from the cart.
- **Orders**
  - `POST /orders`: Place an order.
  - `GET /orders/{id}`: Get details of a specific order.

Please refer to the API documentation or codebase for more details on request/response formats and authentication requirements.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.



## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

We would like to acknowledge the following open-source projects for their valuable contributions:

- [Gin](https://github.com/gin-gonic/gin): Web framework for building APIs in Go.
- [GORM](https://github.com/go-gorm/gorm): ORM library for GoLang.
- [MySQL](https://github.com/go-sql-driver/mysql): MySQL database driver for Go.

## Contact

For any inquiries or questions, please contact [nicolas.castellano.6@gmail.com](mailto:nicolas.castellano.6@gmail.com).
