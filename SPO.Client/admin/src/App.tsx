import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, privateRoutes } from './routes'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout';
import { ThemeProvider } from './components/theme-provider';

function App() {
  const isAuthenticated = false;

  // const user = JSON.parse(localStorage.getItem('user')!)
  // const canAccess = user?.roles.includes('admin')
  const canAccess = true;

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Routes>
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
              canAccess ? (
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
