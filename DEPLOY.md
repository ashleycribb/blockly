# How to Deploy the Smart Contracts Demo to Firebase

This document provides step-by-step instructions on how to deploy the smart contracts demo to Firebase Hosting.

## Prerequisites

*   You have a Google account.
*   You have `node` and `npm` installed on your machine.

## Step 1: Create a Firebase Project

1.  Go to the [Firebase console](https://console.firebase.google.com/).
2.  Click "Add project" and follow the on-screen instructions to create a new project.

## Step 2: Get Your Firebase Credentials

1.  In the Firebase console, open your new project.
2.  In the project overview page, click the "</>" icon to add a web app to your project.
3.  Give your app a nickname and click "Register app".
4.  You will be shown a `firebaseConfig` object with your project's credentials. You will need these in the next step.

## Step 3: Configure the Project

1.  **`.firebaserc`:**
    *   Open the `.firebaserc` file in the root of the project.
    *   Replace `"YOUR_FIREBASE_PROJECT_ID"` with your actual Firebase project ID.

2.  **`demos/smart_contracts/code.js`:**
    *   Open the `demos/smart_contracts/code.js` file.
    *   Replace the placeholder `firebaseConfig` object with the one you got from the Firebase console.

3.  **`demos/smart_contracts/playground.js`:**
    *   Open the `demos/smart_contracts/playground.js` file.
    *   Replace the placeholder `firebaseConfig` object with the one you got from the Firebase console.

## Step 4: Deploy the Application

1.  Open your terminal and navigate to the root of the project.
2.  Run the following command:
    ```bash
    npm run deploy
    ```
3.  This command will:
    *   Install all the necessary dependencies.
    *   Build the project.
    *   Deploy the `demos/smart_contracts` directory to Firebase Hosting.
4.  Once the command is finished, it will give you a public URL where you can view your deployed application.
