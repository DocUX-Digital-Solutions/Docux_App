import './App.css'
import { Amplify } from 'aws-amplify'
import config from './amplifyconfiguration.json'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './contexts/AuthProvider'

Amplify.configure(config)
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
