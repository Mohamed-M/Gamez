'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { GrRobot } from 'react-icons/gr';
import { FaUser } from 'react-icons/fa6';
import LoadingPage from '../loading';

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim() === '') return;
    await sendMessage({ text: input });
    setInput('');
  }

  console.log('messages', messages);

  return (
    <div>
      <h2 className="text-3xl mb-7">Chat AI</h2>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            {message.parts.map((part, index) => {
              if (part.type === 'text') {
                return (
                  <div 
                    className={`flex items-center border py-5 px-4 mb-3 text-white ${message.role === 'user' ? 'bg-blue-500' : 'bg-red-800'}`}
                    key={index}>
                    <div className="mr-7">{message.role === 'user' ? <FaUser size={40} color='white' /> : <GrRobot size={40} color='white' />}</div>
                    <div>{part.text}</div>
                  </div>
                );
              } 
            })}
          </div>
        ))}
      </div>

      {(status === 'streaming' || status === 'submitted') && (<LoadingPage />)}
      
      <form onSubmit={handleSubmit}>
        <input
          className="py-3 px-4 border rounded-lg w-96"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about games!"
        />
        <button 
          className="py-3 px-4 bg-blue-500 text-white rounded-lg ml-2"
          type="submit">Ask</button>
      </form>
    </div>
  )
}