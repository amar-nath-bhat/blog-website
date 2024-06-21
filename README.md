# Fouxy - Blogging Application

This is a project for creating a blog website. The website will allow users to create and publish blog posts, as well as read and comment on existing posts.

## Features

- User Registration and Authentication.
- Create, Edit and Like Blog Posts.
- Delete and Archive Blog Posts.
- Search functionality to find specific Blog Posts based on title and description.
- Filter functionality to find specific Blog Posts based on category.

## Technologies Used

- React and Redux ToolKit for frontend.
- Node.js and Express.js for the backend.
- MongoDB and Mongoose for the database.
- JWT for authentication.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/blog-website.git
```

2. Install the dependencies:

```bash
cd /client
npm install

cd ../server
npm install
```

3. Setup your MongoDB cloud environment and get the connection string, and generate your access and refresh secret token.

4. Create a `.env` file under `server` directory with following:

```bash
MONGO_URI={mongodb_connection_string}
PORT=5000
ACCESS_TOKEN_SECRET={your_access_secret_token}
REFRESH_TOKEN_SECRET={your_refresh_secret_token}
```

5. Start the backend server:

```bash
npm start
```

6. Start your frontend server:

```bash
cd ../client
npm run dev
```

## Usage

1. Register a new account or log in with an existing account.
2. Create a new blog post by clicking on the `Create` page.
3. Edit, delete or archive your blog posts on the `Blogs` page.
4. View and like on other users' blog posts.
5. Use the search functionality to find specific blog posts.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Roadmap

Here are some planned features and improvements for future:

- Implement user roles and permissions.
- Add social media sharing functionality.
- Improve search functionality with filters and sorting options.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
