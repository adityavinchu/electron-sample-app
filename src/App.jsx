import React, { useState, useEffect } from "react";
const { ipcRenderer } = window.require("electron");

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Listen for messages from main process
    ipcRenderer.on("message-from-main", (event, message) => {
      addMessage(`From Main: ${message}`);
    });

    // Listen for periodic updates
    ipcRenderer.on("main-update", (event, message) => {
      addMessage(`Update: ${message}`);
    });

    return () => {
      ipcRenderer.removeAllListeners("message-from-main");
      ipcRenderer.removeAllListeners("main-update");
    };
  }, []);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      // Send message to main process
      ipcRenderer.send("message-to-main", inputMessage);
      addMessage(`Sent to Main: ${inputMessage}`);
      setInputMessage("");
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Electron IPC Demo</h1>

      <div className="mb-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="border p-2 mr-2 rounded"
          placeholder="Enter message"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Send Message
        </button>
      </div>

      <div className="border rounded p-4">
        <h2 className="font-bold mb-2">Message History:</h2>
        <div className="max-h-60 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
              {msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
