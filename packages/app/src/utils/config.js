import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error) {
        if (error.status === 404) return false
        else if (failureCount < 2) return true
        else return false
      },
    },
  },
})

export const FORMAT_DATE = "yyyy-MM-dd'T'HH:mm:ss'Z'"

export const prefixedCities = ['Florianópolis', 'Zaragoza', 'London']
