import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, privateRoutes } from './routes'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout';
import { ThemeProvider } from './components/theme-provider';
import { RootState, useAppSelector } from './store/store';

function App() {
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
  const user = JSON.parse(localStorage.getItem('user')!)
  const canAccess = user?.role === 'Admin' || user?.role === 'SysAdmin'

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          {authRoutes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={
              isAuthenticated ? <Navigate to="/" /> : (
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
