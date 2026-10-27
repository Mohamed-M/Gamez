'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim() === '') return;
    await sendMessage({ text: input });
    setInput('');
  }

  return (
    <div>
      <h2>Use AI Chat</h2>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            {message.parts.map((part, index) => {
              if (part.type === 'text') {
                return (
                  <div key={index}>
                    {message.role === 'user' ? 'User: ' : 'AI: '}
                    {part.text}
                  </div>
                );
              } 
            })}
          </div>
        ))}
      </div>

      {(status === 'streaming' || status === 'submitted') && (<div><h2>Loading...</h2></div>)}
      
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}