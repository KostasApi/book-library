# Book Library

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

Web application to store each user his/her favourite books.

### Built With

- [Docker](https://www.docker.com/)
- [NGINX](https://www.nginx.com/)
- [React](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [mongoDB](https://www.mongodb.com/)
- [mongoose](https://mongoosejs.com/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

In order to avoid the installation on the above technologies locally, the project leveraging **Docker**. So the only dependency to run the project in development mode is **Docker**.

- Docker :whale:

```sh
https://www.docker.com/get-started
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/KostasApi/book-library.git
```

2. Build project's Docker Images

```sh
docker-compose build
```

3. Run project's Docker Containers

```sh
docker-compose up
```

4. Stop project's Docker Containers

```sh
docker-compose down
```

<!-- ROADMAP -->

## Roadmap

- :white_check_mark: Setup basic Node.js server
- :white_check_mark: Integrate mongoDB
- :white_check_mark: CRUD Book
- :white_check_mark: Add swagger
- :white_check_mark: Dokerize server & DB
- :white_check_mark: Server error handling
- :white_check_mark: Add Authentication & Authorizarion
- :white_check_mark: Integrate Redis cache
- :white_check_mark: Handle Redis unavailability
- :white_check_mark: Bootstrap React client
- :white_check_mark: Use React Hooks & Context API
- :white_check_mark: Create Home, Sign In, Sign Up, Booklist & Not Found pages
- :white_check_mark: Sign out on unauthorized error
- :white_check_mark: Client side user & book validation
- :white_check_mark: Server enhancements:
  - :white_check_mark: sanitize DB data
  - :white_check_mark: security headers
  - :white_check_mark: protect from xss attacks
  - :white_check_mark: rate limit requests
  - :white_check_mark: protect from http param pollution
  - :white_check_mark: add cors
- :white_check_mark: Create README file
- :white_check_mark: Deploy app in local kubernetes cluster

- :x: Add commit hook
- :x: Server Unit Tests
- :x: Client Unit Tests
- :x: Deploy app in a host provider

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Your Name - [Konstantinos Apidopoulos](https://www.linkedin.com/in/konstantinosapidopoulos) - kostas.apidopoulos@gmail.com

Project Link: [https://github.com/KostasApi/book-library](https://github.com/KostasApi/book-library)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
