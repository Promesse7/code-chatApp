import './App.css';
import List from './components/list/list';
import Chat from './components/chat/chat';
import Detail from './components/details/detail';
import Login from './components/login/Login';
import Notification from './components/notification/Notification';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/lib/firebase';
import { useUserStore } from './components/lib/userStore';
import { useChatStore } from './components/lib/chatStore ';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, fetchUserInfo } = useUserStore();
  const { chatId, initializeAuth } = useChatStore();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserInfo(user.uid);
      }
      setIsLoading(false);
    });

    initializeAuth();

    return () => {
      unsubscribeAuth();
    };
  }, [fetchUserInfo, initializeAuth]);

  if (isLoading) return <div className='loading'>Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}

export default App;