# Electron IPC Demo

This project demonstrates inter-process communication (IPC) between the main process and the renderer process in an Electron application.  It showcases how to send messages back and forth and how the main process can send periodic updates to the renderer.

## Features

*   **Bidirectional Communication:** Send messages from the renderer process to the main process and receive responses.
*   **Periodic Updates:** The main process sends updates to the renderer process at regular intervals.
*   **Message History:** Displays a history of sent and received messages in the renderer process.

## Technologies Used

*   **Electron:** Framework for building cross-platform desktop applications with web technologies.
*   **React:** JavaScript library for building user interfaces.
*   **Electron-is-dev:** Utility to check if the app is running in development mode.

## Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://www.google.com/search?q=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)  # Replace with your repo URL
    cd YOUR_REPO_NAME
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

## Development

1.  Start the development server:

    ```bash
    npm run electron-dev
    ```

    This will start the React development server and the Electron application.

## Building

1.  Build the application for production:

    ```bash
    npm run build
    ```

    This will create a distributable version of the application in the `build` directory.

## Usage

1.  In the application window, type a message in the input field.
2.  Click the "Send Message" button.
3.  The message will be sent to the main process, and the main process will send a response back to the renderer.
4.  Both the sent message and the response will be displayed in the message history.
5.  The main process will also send periodic updates to the renderer, which will also be displayed in the message history.

## Code Overview

### Main Process (main.js)

*   Uses `electron` and `electron-is-dev` to create and manage the application window.
*   Listens for messages from the renderer process using `ipcMain.on`.
*   Sends responses back to the renderer process using `event.reply`.
*   Sends periodic updates to the renderer process using `mainWindow.webContents.send`.

### Renderer Process (src/App.js)

*   Uses `electron`'s `ipcRenderer` to send messages to the main process and receive messages from the main process.
*   Uses `useState` and `useEffect` hooks to manage the message history and listen for messages from the main process.

## Project Structure

YOUR_REPO_NAME/
├── public/
│   ├── index.html
│   ├── main.js  # Electron Main process
│
├── src/  # React source code
│   ├── App.jsx  # Main React component
│   ├── index.jsx
│
├── package.json
├── README.md
