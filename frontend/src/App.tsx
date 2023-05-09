import useSyncQuery from './api/hooks/auth/queries/useSyncQuery'
import LoadingSpinner from './components/common/LoadingSpinner'
import AppRoutes from './routes'

const App = () => {
  const { isLoading } = useSyncQuery()

  return <>{isLoading ? <LoadingSpinner /> : <AppRoutes />}</>
}

export default App
