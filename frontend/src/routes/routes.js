import React, { lazy, Suspense, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import FullLayout from '../layouts/FullLayout';
import ProtectedRoute from '../components/ProtectedRoute';

const Signin = lazy(() => import('../components/Signin/Signin'));
const About = lazy(() => import('../views/About'));
const Alerts = lazy(() => import('../views/ui/Alerts'));
const Badges = lazy(() => import('../views/ui/Badges'));
const Buttons = lazy(() => import('../views/ui/Buttons'));
const Cards = lazy(() => import('../views/ui/Cards'));
const Grid = lazy(() => import('../views/ui/Grid'));
const Tables = lazy(() => import('../views/ui/Tables'));
const getAllTickets = lazy(() => import('../views/ui/allTicket'));
const Breadcrumbs = lazy(() => import('../views/ui/Breadcrumbs'));
const UserProfile = lazy(() => import('../components/userProfile/userprofile'));
const Signup = lazy(() => import('../components/Signup/Signup'));
const NotFound = lazy(() => import('../components/404/404'));
const NotAccessible = lazy(() => import('../components/notaccessible/notaccessible'));

const Loading = () => <div>Loading...</div>;

const AppRoutes = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(prev => !prev);

  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
      

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Navigate to="/signup" />} />

          <Route path="dashboard" element={<ProtectedRoute element={FullLayout} roles={['admin']} />}>
            <Route path="allTickets" element={<ProtectedRoute element={getAllTickets} roles={['admin']} />} />
            <Route path="about" element={<ProtectedRoute element={About} roles={['admin']} />} />
            <Route path="alerts" element={<ProtectedRoute element={Alerts} roles={['admin']} />} />
            <Route path="badges" element={<ProtectedRoute element={Badges} roles={['admin']} />} />
            <Route path="buttons" element={<ProtectedRoute element={Buttons} roles={['admin']} />} />
            <Route path="cards" element={<ProtectedRoute element={Cards} roles={['admin']} />} />
            <Route path="grid" element={<ProtectedRoute element={Grid} roles={['admin']} />} />
            <Route path="table" element={<ProtectedRoute element={Tables} roles={['admin']} />} />
            <Route path="breadcrumbs" element={<ProtectedRoute element={Breadcrumbs} roles={['admin']} />} />
          </Route>

          <Route path="/profile" element={<ProtectedRoute element={UserProfile} roles={['user', 'admin']} />} />
          <Route path="/notaccessible" element={<NotAccessible />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AppRoutes;
