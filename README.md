# Social Networking API

The Social Networking API is a RESTful API built using Node.js and Express.js that enables users to interact with a social networking platform. It allows users to create accounts, make posts, follow other users, and view posts from users they follow.

## Features

- User registration and authentication
- Create, update, delete posts
- Follow and unfollow other users
- View latest posts from followed users
- Error handling and responses

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone <repository_url>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and provide the following variables:

    ```dotenv
    PORT=8080
    MONGODB_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

4. Run the application:

    ```bash
    npm run server
    ```

    The API will be accessible at `http://localhost:8080`.

## API Endpoints

### User Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login and generate a JWT token.
- **POST /api/user/create**: Create a new user profile.
- **PUT /api/user/update/:userId**: Update user profile.
- **GET /api/user/:userId**: Get user profile.
- **DELETE /api/user/delete/:userId**: Delete user profile.
- **POST /api/user/follow/:userId**: Follow a user.
- **GET /api/user/following**: Get list of users being followed.
- **GET /api/user/followers**: Get list of followers.

### Post Endpoints

- **POST /api/post/create**: Create a new post.
- **PUT /api/post/update/:postId**: Update post.
- **GET /api/post/:postId**: Get post details.
- **DELETE /api/post/delete/:postId**: Delete post.

### Follow/Unfollow & Latest Posts

- **POST /api/user/follow/:userId**: Follow a user.
- **POST /api/user/unfollow/:userId**: Unfollow a user.
- **GET /api/user/latest-posts**: Get latest posts from followed users.

## Testing

Integration tests are written using Jest and Supertest. To run the tests, use the following command:

```bash
npm test
