import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatPage from './pages/ChatPage';
import CallPage from './pages/CallPage';
import NotificationPage from './pages/NotificationPage';
import OnboardingPage from './pages/OnboardingPage';


const App = () => {
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/SignUp' element={<SignupPage />} />
        <Route path='/Chat' element={<ChatPage />} />
        <Route path='/Call' element={<CallPage />} />
        <Route path='/notifications' element={<NotificationPage />} />
        <Route path='/onboarding' element={<OnboardingPage />} />
      </Routes>
    </div>
  )
}

export default App
