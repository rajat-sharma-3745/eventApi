# EventAPI

EventAPI is a Node.js and Express-based RESTful API designed to manage events, including creation, retrieval, updating, deletion, and file uploads.

## Features

* Create, update, delete, and retrieve events
* File upload support using Multer
* Centralized error handling middleware
* MongoDB database connection via MongoDB
* Modular folder structure for scalability

## Requirements

* Node.js (v16 or later recommended)
* MongoDB database

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd eventapi
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create an environment configuration file (`.env`) and add:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   ```

## Running the Server

Start the development server:

```bash
npm start
```

The server will run on:

```
http://localhost:5000
```


## File Uploads

* Uploads are handled using **Multer**
* Uploaded files temporarily stored in `tmp/`

## Error Handling

The API uses a centralized error handling middleware to ensure consistent error responses.

## Utilities

* **asyncHandler**: Utility to handle async route errors
* **apiError**: Custom error class for structured error responses


