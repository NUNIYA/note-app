##  GDSC Backend Final Project: Mongoose Notes App with Google Authentication

This project is a complete backend application for a note-taking application built using Mongoose, Express, and Google OAuth for authentication. 

**Features:**

* **User Authentication:** Securely log in using your Google account.
* **Note Management:** Create, read, update, and delete notes.
* **MongoDB Database:** Persistent storage for notes, ensuring data integrity.

**Getting Started:**

1. **Prerequisites:**
    * **Database:** A MongoDB instance (e.g., MongoDB Atlas or a local installation).
    * **Google Console Account:** Create a Google Cloud project and obtain your API credentials (client ID and secret).
2. **Set up Environment Variables:**
   * Create a `.env` file in the project root directory.
   * Add the following environment variables:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@mongodburlhere
     GOOGLE_CLIENT_ID=YOUR_GOOGLE_ID_HERE
     GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
     GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback 
     ```
3. **Installation:**
   * Open your terminal and navigate to the project directory.
   * Install dependencies: `npm install`
   * Start the server: `npm start`

**Deployment:**

This project can be deployed to a cloud platform like Heroku or AWS.  Ensure that you configure your environment variables and database connection appropriately for your chosen deployment platform.
