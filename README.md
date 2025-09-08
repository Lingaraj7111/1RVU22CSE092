# URL Shortener Frontend

This project implements a URL shortener application for the Campus Hiring Evaluation, built with Next.js and TypeScript. The application's core functionality is supported by several key files, each with a specific role.

***

### File Descriptions

* **`UrlInputForm.tsx`**: This component handles the user interface for shortening URLs. It manages input fields for the long URL, validity period, and custom shortcode, and validates the data before processing.
* **`storage.ts`**: A utility file containing helper functions for interacting with `localStorage`. It is used to persist authentication tokens and a history of shortened URLs on the client-side.
* **`logging.ts`**: This file contains the logging middleware. It provides a reusable `Log` function that captures and sends crucial application events, errors, and debugging information to the evaluation's logging API.
