# Description
This application is intended to be a demo of an api created using NodeJs and a set of good practices. Particularly, this application is an api for an auction platform following the vickrey auction rules.

# Prerequisites
To run the application it is required to have installed:
    - NodeJs: you can install it using [chocolatey](https://chocolatey.org/install): https://community.chocolatey.org/packages/nodejs

# Install
run **npm install**

# Test
run **npm run test**

# Run Local
run **npm run local**

# TODO
    - Add assertions for end2end tests
    - Add validations
        - request: using json schema and joi
        - existence of bidders and bids.
    - Add logging
    - Add a linting phase to scripts
    - Use a production database
    - Add authentication
    - Add authorization
    - Parallel algorithm in case of auctions with too many bids
        - Map/Reduce
        - Split bids list into chunks and process them with parallel execution