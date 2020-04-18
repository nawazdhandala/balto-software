# Blato Software Interview

## Before we begin: 

- This is NOT production ready code. 
- This code is NOT linted. This should be done pre-commit hook and in CI/CD.
- No tests for this code has been written. 
- No depency audit has been done (ex: npm audit). This should be done in CI/CD.
- No unused depency check has been done. This should be done in CI/CD.
- No frontend and backend validation has been done for the data input because of time constraints. In production project, this should be done. 
- I'm very new to python. Python code may not be structured properly. Flask is very similar to node express and working with flask was a breeze. 
- The import CSV API in this project does not return a response until the job is complete. In realworld, it should return an ACCEPTED response, and when the job is complete - it should send an email to the user. 
- I've attached the postman-collection with this project, so its easier for you to test API's. 
- Overall, all the features in this project is complete BUT this project is a hack. It was finished in the short amount of time.
- If you'd like to look into quality of my professional projects. I'm more than happy to have a call and show them off to you.
- This was done by using Postgres (DB I'm most comfortable with)
- FE was done using React (using a generic theme). 
- I've used flask as py web framework. 
- Search: I've used LIKE query for search. This is not recommended. You should use search database (like ElasticSearch) in production. 

## Running this project locally: 

### Create DB
```sh
$ export DATABASE_URL="postgresql://username:password@localhost/mydatabase"
```

```
$ python manage.py create_db
```

### Install and Build Front-End

```sh
$ cd static
$ npm install
$ npm build 
$ cd ..
```

### Run Server

```sh
$ python manage.py runserver
```

You can now access your server at `http://localhost:5000`

### CSV Import

Please import postman collection into Postman and use the "Import CSV Request" to import CSV. 

Happy to hear your thoughts and reviews! :)






