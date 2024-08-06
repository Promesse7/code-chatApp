import './App.css';
import List from './components/list/list';
import Chat from './components/chat/chat';
import Detail from './components/details/detail';
import Login from './components/login/Login';
import Register from './components/Register/Register'; // Import Register component
import LandingPage from './components/landingPage/LandingPage';
import Notification from './components/notification/Notification';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/lib/firebase';
import { useUserStore } from './components/lib/userStore';
import { useChatStore } from './components/lib/chatStore ';
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('landing');
  const { currentUser, fetchUserInfo } = useUserStore();
  const { chatId, initializeAuth } = useChatStore();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserInfo(user.uid);
        setCurrentView('main');
      } else {
        setCurrentView('landing');
      }
      setIsLoading(false);
    });

    initializeAuth();

    return () => {
      unsubscribeAuth();
    };
  }, [fetchUserInfo, initializeAuth]);

  if (isLoading) return <div className='loading'>Loading...</div>;

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentView('login')} />;
      case 'login':
        return <Login onLoginSuccess={() => setCurrentView('main')} onSwitchToRegister={() => setCurrentView('register')} />;
      case 'register':
        return <Register onRegisterSuccess={() => setCurrentView('main')} onSwitchToLogin={() => setCurrentView('login')} />;
      case 'main':
        return (
          <>
            <List />
            {chatId && <Chat />}
            {chatId && <Detail />}
          </>
        );
      default:
        return <div>Error: Unknown view</div>;
    }
  };

  return (
    <div className="container">
      {renderContent()}
      <Notification />
      <Analytics />
    </div>
  );
}

export default App;
