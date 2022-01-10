# First go throught the following articles:
-  https://dev.to/getd/how-to-manage-secrets-and-configs-using-dotenv-in-node-js-and-docker-2214
    Read till point 3 ( ignore things in docker and after that)
- https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/

# What env does?
.env files allow you to put your environment variables inside a file. You just create a new file called .env in your project and slap your variables in there on different lines. At runtime, the reference to the environment variable name is replaced with its current value.


# Use cases of Environment files:
- Execution mode (e.g., production, development, staging, etc.)
- API URL
- authentication keys (only secure in server applications)
etc etc

# ENV files: // first understand what is production environment and development environment:

- why needed: to segregate production database from mock db being used in development + to segregate production code(deployed every 3 months) from code in developemnt( chagned every day by 50 people) //use of environment files- to be able to maintain different files that can seperately maintain different values for connetion strings etc for dev and prod


# HOW?

1. install Package dotenv ( npm i dotenv)

2. add NODE_ENV=<dev/prod> in your package.json script..these scripts can be run using <npm run scriptName>
 e.g.  "scripts": {
    "start_dev": "NODE_ENV=dev nodemon src/index.js",
    "start_prod": "NODE_ENV=prod node src/index.js"
  },

3. create 2 files .env.dev and .env.prod which will contain the values of urls/seccrets to be used in prod and dev

4. use the below code(in index.js) to start using the variables defined in the above files 
            if (process.env.NODE_ENV) {
            require ("dotenv").config({
                  path:`./.env.${process.env.NODE_ENV}`
            })
            } else require ("dotenv").config()

5. use 'process.env.VARIABLE_NAME' to access the value in the env files

# NOTE:
//there are multiple ways ( and packages) that can help segregate environments and different values for environment variables.. dotenv is one such package and probably the most popular one too