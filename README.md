<p align="center">
  <a href="https://provi.com.br/">
    <img src="media/provi_logo_nobg.png" alt="Logo" width=50% height=50%>
  </a>
  <p align="center">
  Revolucionando a educação através de crédito descomplicado.
  </p>
</p>

# Provi challenge

## Table of Contents

* [About](#about)
  * [Tech behind it](#tech-behind-it)
* [Installation](#installation)
* [Using it](#using-it)
* [Testing](#testing)


## About

The [challenge](https://github.com/provicapital/challenge_node) consists in building an API to manage users and their info and data on loan requests.

### Tech behind it
* Node.js
* Express.js
* Git
* Jest (for testing)
  * Frisby (for testing the endpoints)
* MongoDB
  * Mongoose (package to access MongoDB)
* npm (to install and rule them all!)
  * Bcryptjs
  * Body-parser
  * Cep-promise
  * Cpf
  * Fs
  * Jsonwebtoken
  * Path

## Installation

Download and install [node](https://nodejs.org/en/#home-downloadhead). <br>
If you are on Linux, macOs or another OS, follow the Installation steps [here](https://nodejs.org/en/download/package-manager/). <br>
Download and instal [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) (any OS). <br> <br>
Clone the repo wherever you want. <br>
Use on terminal:
```sh
git clone https://github.com/andre-custodio/provi.git
```
Open the project using your favorite IDE. Inside it, install all the packages using npm via terminal:
```sh
npm install
```

## Using it

* Open the project on your terminal, on main folder `provi` type:
```sh
node .\src\index
```
* Use a third-party software to use the API and access the endpoints.
* The API is hosted at http://localhost:3000/
* All models have a `.get` method on root path `/`. Use it to see all the records.
```
GET http://localhost:3000/table-name/
```
* You can create an instance using `.post` method on root path `/`.
```
POST http://localhost:3000/table-name/
```
* Update using `.put` on path `/:id`
```
PUT http://localhost:3000/table-name/id
```
* Delete using `.delete` on path `/:id`
```
DELETE http://localhost:3000/table-name/id
```

## Testing

* Run the project just like you did on [Using it](#using-it):
```sh
node .\src\index
```
* While running, open another terminal and inside root `/provi` type:
```sh
npm test
```
* This will run all the tests and return if it failed or succeed.
