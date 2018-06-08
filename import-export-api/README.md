# Import/Export API

This is a simple Express API server allowing users to create/list import/export jobs that take a specific amount of time to complete;

## Structure

`src/controllers/*` route handlers: responsible for parsing the requests' input and the general business logic

`src/middleware/*` a couple of middleware functions responsible for error handling and invalid URLs handling (404s)

`src/models/*` classes that implement models representing our resources (jobs)

`app.ts` express initialization and configuration logic

`errors.ts` custom errors to be used throughout the application

## Testing

Most of the testing is done **e2e** by spinning up an instance of the API and making HTTP requests to simulate all possible scenarios. These tests live in `test/e2e/*`.

Our model-specific logic (job completion) is tested using unit-tests and live in `test/models/*`.

## Scripts

`npm start` as requested, this compiles TS into JS and runs the application

`npm test` runs all unit/e2e tests with Mocha

`npm run coverage` analyses code coverage with NYC (Instambul)

`npm run lint` lints the code with TSLint