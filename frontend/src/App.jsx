import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatPage from './pages/ChatPage';
import CallPage from './pages/CallPage';
import NotificationPage from './pages/NotificationPage';
import OnboardingPage from './pages/OnboardingPage';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './lib/axios.js';
import PageLoader from './components/PageLoader.jsx';
// import { getAuthUser } from './lib/api.js';
import useAuthUser from './hooks/useAuthUser.js';
import Layout from './components/Layout.jsx';
import { useThemeStore } from './store/useThemeStore.js';


const App = () => {
  
  const { isLoading, authUser } = useAuthUser();
  const isOnboarded = authUser?.isOnboarded;

  const isAuthenticated = Boolean(authUser);

  const { theme, setTheme } = useThemeStore();

  
  if(isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route path='/' 
        element={ isOnboarded && isAuthenticated ?  ( 
        <Layout>
           <HomePage />
        </Layout>
         ) : (
          <Navigate to={ !isAuthenticated ? "/login" : "/onboarding" } />
        )} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route path='/Chat' element={authUser ? <ChatPage />: <Navigate to="/login" />} />
        <Route path='/Call' element={authUser ? <CallPage />: <Navigate to="/login" />} />
        <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path='/onboarding' 
        element={ isAuthenticated ? (
          !isOnboarded ? <OnboardingPage /> : <Navigate to="/"/>
        ) : ( <Navigate to="/login" /> 
        )} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
