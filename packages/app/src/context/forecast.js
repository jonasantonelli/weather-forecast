import React, { useMemo } from 'react'

import { useForecastSearch } from 'hooks/forecast'
import { useLocalStorage } from 'utils/hooks'

const ForecastContext = React.createContext()

const useForecastContext = () => {
  const context = React.useContext(ForecastContext)
  if (typeof context === 'undefined') {
    throw new Error('useForecastContext must be used within a ForecastProvider')
  }
  return context
}

const ForecastProvider = props => {
  const [city, setCity] = useLocalStorage('forecast:city', null)

  const search = useForecastSearch({
    location: city,
  })

  const value = useMemo(
    () => ({
      city,
      setCity,
      search,
    }),
    [city, setCity, search],
  )

  return <ForecastContext.Provider value={value} {...props} />
}

export { ForecastProvider, useForecastContext }
