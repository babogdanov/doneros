import useSyncQuery from './api/hooks/queries/auth/useSyncQuery'
import LoadingSpinner from './components/common/LoadingSpinner'
import AppRoutes from './routes'

const App = () => {
  const { isLoading } = useSyncQuery()

  return <>{isLoading ? <LoadingSpinner /> : <AppRoutes />}</>
}

export default App
