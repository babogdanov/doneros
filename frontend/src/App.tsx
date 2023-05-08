import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

import './index.css'
// Load react toastify CSS
import 'react-toastify/dist/ReactToastify.css'
import AppRoutes from './routes'

// Create a client
const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer hideProgressBar newestOnTop theme='colored' autoClose={5000} />
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
