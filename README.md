# Email Sending Node.js Project

This Node.js project allows you to send emails using Google's OAuth2 authentication. The project requires some initial setup and configuration before you can start sending emails.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
  - [Step 1: Create `credentials.json`](#step-1-create-credentialsjson)
  - [Step 2: Create `app.constants.ts`](#step-2-create-appconstantsts)
  - [Step 3: Add `sample.pdf`](#step-3-add-samplepdf)
  - [Step 4: Create `contacts.xlsx`](#step-4-create-contactsxlsx)
- [Usage](#usage)
  - [Start the Application](#start-the-application)
  - [Send an Email](#send-an-email)

## Installation

To get started, you need to install the project dependencies using npm:

```bash
npm ci
```

This will install all the necessary packages based on the `package-lock.json` file.

## Setup

### Step 1: Create `credentials.json`

1. **Go to the [Google Cloud Console](https://console.cloud.google.com/).**
2. **Create a new project** or select an existing one.
3. **Enable the Gmail API** for your project.
4. **Create OAuth 2.0 credentials**:
   - Go to the **Credentials** section.
   - Click on **Create Credentials** and select **OAuth 2.0 Client IDs**.
   - Fill out the necessary information and make sure to add `http://localhost:3000/email/callback` as a redirect URI.
5. **Download the `credentials.json` file**.
6. **Place the downloaded `credentials.json` file in the root of your project**.

The `credentials.json` file should look like this:

```json
{
  "web": {
    "client_id": "",
    "project_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_secret": "",
    "redirect_uris": [""]
  }
}
```

7. **Add your Google account as a tester**:
   - Go to the **OAuth consent screen**.
   - Add the Google account you will use to send emails as a **test user**.

### Step 2: Create `app.constants.ts`

1. **Create a file named `app.constants.ts` inside the `src` folder**.
2. **Add the following content** to the file:

```typescript
export const emailDetails = {
  subject: '',
  body: ``,
  attachment: '',
};

export const contactDetails = 'contacts.xlsx';
```

### Step 3: Add `sample.pdf`

1. **Create a file named `sample.pdf`** and place it in the root of your project.
2. **If you are using a different file name**, update it in the `app.constants.ts` file.

### Step 4: Create `contacts.xlsx`

1. **Create a file named `contacts.xlsx`**.
2. **Add two columns**: `Name` and `Email`.
3. **Fill in the recipient details** in this file.

## Usage

### Start the Application

To start the application, run the following command:

```bash
npm run start
```

### Send an Email

To send an email, make a request to the following endpoint from your browser:

```
http://localhost:3000/email/send
```
