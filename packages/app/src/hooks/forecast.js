import { useQuery } from 'react-query'
import { search } from 'services/forecast'

const forecastSearchConfig = ({ location }) => ({
  queryKey: ['forecastSearch', { location }],
  queryFn: async () => search(location).then(result => result),
  enabled: !!location,
})

function useForecastSearch(config) {
  const result = useQuery(forecastSearchConfig(config))
  return {
    ...result,
    forecasts: result?.data || [],
  }
}

export { useForecastSearch }
