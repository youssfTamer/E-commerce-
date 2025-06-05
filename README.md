# E-commerce Backend

A Node.js backend for an E-commerce application built with Express.js and MongoDB.

## Features

- CRUD operations for brands, categories, subcategories, products, reviews, and coupons.
- Authentication and authorization.
- File uploads and static file serving.
- Global error handling.

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd e-commerce-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   - Create a `.env` file in the `config` directory.
   - Add the following variables:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the application:**
   ```bash
   npm start
   ```

## API Overview

- **Categories:** `/category`
- **Subcategories:** `/subcategory`
- **Brands:** `/brand`
- **Products:** `/product`
- **Authentication:** `/auth`
- **Reviews:** `/review`
- **Coupons:** `/coupon`

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. 