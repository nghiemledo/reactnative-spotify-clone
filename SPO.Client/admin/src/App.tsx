import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, privateRoutes } from './routes'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Loading from './components/loading';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  const role = localStorage.getItem('role')
  const canAccess = role === 'Admin' || role === 'SysAdmin';
  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/admin" /> : <Navigate to="/login" />}
          />

          {authRoutes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={
              isAuthenticated ? <Navigate to="/admin" /> : (
                <AuthLayout>
                  <Component />
                </AuthLayout>
              )
            } />
          ))}

          {privateRoutes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={
              isAuthenticated && canAccess ? (
                <AdminLayout>
                  <Component />
                </AdminLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            } />
          ))}
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
