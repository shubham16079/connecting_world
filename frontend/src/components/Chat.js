import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const ChatApp = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io('http://localhost:5000');
  console.log(socket);

  useEffect(() => 
  {
    const userData = { username: 'John Doe' };
    socket.emit('user data', userData);
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('hello', (arg) => {
      setMessages((prevMessages) => [...prevMessages, arg]);
    });
    
    return () => {
      socket.off('chat message');
      socket.off('hello');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      socket.emit('chat message', inputValue);
      setInputValue('');
    }
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
