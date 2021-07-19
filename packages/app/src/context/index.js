import * as React from 'react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'utils/config'
import { BrowserRouter as Router } from 'react-router-dom'
import { ForecastProvider } from './forecast'

function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ForecastProvider>{children}</ForecastProvider>
      </Router>
    </QueryClientProvider>
  )
}

export { Providers }
