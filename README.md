# NodeJS MongoDB CRUD 

## Installation

1) Go to the link and download mongodb. [MongoDB Page] https://www.mongodb.com/download-center/community 

2) Go to the link and download nodejs. [NodeJS Page] https://nodejs.org/en/download/

3) Start mongodb service
  ```bash
    mongod
  ```

4) in the directory where the package.json file is
  ```bash
    npm install
  ```

5) in the directory 
  ```bash
    npm start
  ```
  
  
6) How to create a RESTful crud api using Nodejs?
  ```bash
    http://localhost:5000/api/users  -> Method: Get  |  all users
  ```
  
  ```bash
    http://localhost:5000/api/users/id  -> Method: Get  |  Single user
  ```
  
  ```bash
    http://localhost:5000/api/users/id  -> Method: Delete  |  Delete single user
  ```
  
   ```bash
    http://localhost:5000/api/users/id  -> Method: Post  |  Add user body param requires -> name,email,password
  ```
  
   ```bash
    http://localhost:5000/api/users/id  -> Method: Put  |  Update single user body params -> name or email or password
  ```





