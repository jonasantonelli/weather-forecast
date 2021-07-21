import { useEffect } from 'react'
import styled from 'styled-components'
import { useForecastContext } from 'context/forecast'
import { useParams, useLocation, Link } from 'react-router-dom'
import HourCard from 'atoms/HourCard'
import Title from 'atoms/Title'
import BaseGrid from 'atoms/Grid'
import Loading from 'atoms/Loading'
import Button from 'atoms/Button'
import { ReactComponent as ArrowLeft } from 'icons/arrow-left.svg'
import format from 'date-fns/format'

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  max-width: 542px;
  width: 100%;

  ${Title} {
    flex-grow: 1;
  }

  ${Button} {
    position: absolute;
  }
`

const Grid = styled(BaseGrid)`
  grid-template-columns: minmax(320px, 354px);

  @media screen and (min-width: 600px) {
    grid-template-columns: minmax(200px, 260px) minmax(200px, 260px);
  }
`

function mapHourlyForecast(weathers = []) {
  return weathers.map(({ time, ...rest }) => {
    const hour = format(new Date(time), 'HH')

    return {
      hour,
      ...rest,
    }
  })
}

const HourlyForecast = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const { id } = useParams()
  const { search } = useForecastContext()

  const { isIdle, isLoading, forecasts } = search

  if (isIdle) {
    return null
  }

  if (isLoading || !forecasts) {
    return (
      <Root>
        <Loading />
      </Root>
    )
  }

  const current = forecasts.find(({ _id }) => _id === id)
  const today = new Date(current.date).setHours(0, 0, 0, 0)
  const title = format(today, 'eeee')

  console.log(current)

  return (
    <Root>
      <Header>
        <Button as={Link} to="/">
          <ArrowLeft />
        </Button>
        <Title>{title}</Title>
      </Header>
      {current && (
        <Grid>
          {mapHourlyForecast(current.weatherHourly)
            .sort((a, b) => a.hour - b.hour)
            .map(props => (
              <HourCard key={props?._id} {...props} />
            ))}
        </Grid>
      )}
    </Root>
  )
}

export default HourlyForecast
