'use client'; // Required for Next.js App Router to use client-side hooks

import { useEffect } from 'react';
import { authenticateUser, registerUser } from '../api/auth';
import { storage } from '../utils/storage';

export default function Home() {

  const handleAuthFlow = async () => {
    let clientId = storage.get('clientId');
    let clientSecret = storage.get('clientSecret');

    if (!clientId || !clientSecret) {
      try {
        const result = await registerUser();
        clientId = result.clientId;
        clientSecret = result.clientSecret;
      } catch (error) {
        console.error("Authentication flow aborted due to registration error.");
        return;
      }
    }
    
    try {
        await authenticateUser(clientId, clientSecret);
    } catch(error) {
        console.error("Authentication failed after registration.");
    }
  };

  return (
    <div>
      <h1>URL Shortener Exam</h1>
      <button onClick={handleAuthFlow}>
        Start Registration & Authentication
      </button>
    </div>
  );
}