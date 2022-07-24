# Chat App - Techical Test

This project i made just for techical assessment.

**Note: this README is for _evaluator_ rather than _users_ or _contributors_.
But you can _contribute_ to the project or you can use the project for study.**

## Quick Start

The App build system uses a [nodejs], [express], [mongodb],

[nodejs]: hhttps://nodejs.org/en/
[express]: https://expressjs.com/
[mongodb]: https://www.mongodb.com/

### Description

This project will do the following

-   Create an express server
-   Database connection
-   API validations
-   Users Service
    -   Create a user
    -   Get a user by id
    -   Get all users
    -   Delete a user by id
-   Auth Service
    -   JWT Authentication
-   Auth Guard | Middleware
-   Room Messages Service
    -   Initiate a chat between users
    -   Delete room by it's id
    -   Get recent conversation from all chats (inspired by whatsapp)
    -   See conversation for a chat room by it's id
    -   Create a message in chat room
    -   Mark an entire conversation as read (inspired by whatsapp)
    -   Delete message by it's id
-   Web socket class
    -   When an event `disconnect`
    -   When a user wants to maintain it's identity
    -   When a user joins a chat room
    -   When a user mutes a chat room

### Installing from Source

1. Make sure you have installed the dependencies:

    - `node.js` stable version
    - `mongodb` local or use `docker`
    - `mongo compass` GUI for mongodb collection

2. Clone the source with `git`:

    ```sh
    git clone https://github.com/muhammadraflyelquraish/chatapp-assessment.git
    cd chatapp-assessment
    ```

3. Configure the build settings:

    Rename `.env.example` to be `.env`, and customize with your owns

4. Running:
   If you want to run as development, you can write command:

    ```sh
    npm run start:dev
    ```

    But, if you want to run as production, you can write command:

    ```sh
    npm run start
    ```
