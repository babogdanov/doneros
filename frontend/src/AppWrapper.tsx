import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

import './index.css'
// Load react toastify CSS
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import { queryClient } from './api/queryClient'
// Create a client

const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer hideProgressBar newestOnTop theme='colored' autoClose={5000} />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default AppWrapper
