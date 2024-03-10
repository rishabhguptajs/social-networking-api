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

2. Navigate to your directory:

    ```bash
    cd <directory_name>
    ```

3. Install dependencies:

    ```bash
    npm install .
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and provide the following variables:

    ```dotenv
    PORT=8080
    MONGODB_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

5. Run the application:

    ```bash
    npm run server
    ```

    The API will be accessible at `http://localhost:8080`.

## API Endpoints

### User Routes

#### Create a New User
- **POST** /api/user/create

#### Update User Profile
- **PUT** /api/user/update/:userId

#### Get User Profile
- **GET** /api/user/get/:userId

#### Delete User Profile
- **DELETE** /api/user/delete/:userId

#### Get Followers List
- **GET** /api/user/followers

#### Get Following List
- **GET** /api/user/following

#### View Latest Posts
- **GET** /api/user/latest-posts

### Post Routes

#### Create a New Post
- **POST** /api/post/create

#### Update Post
- **PUT** /api/post/update/:postId

#### Get Post
- **GET** /api/post/get/:postId

#### Delete Post
- **DELETE** /api/post/delete/:postId

#### View Latest Posts
- **GET** /api/post/latest-posts

### Follow Routes

#### Follow a User
- **POST** /api/routes/follow/:userId

#### Unfollow a User
- **POST** /api/routes/unfollow/:userId

### Authentication Routes

#### Register
- **POST** /api/auth/register

#### Login
- **POST** /api/auth/login

## Testing

Integration tests are written using Jest and Supertest. To run the tests, use the following command:

```bash
npm test

