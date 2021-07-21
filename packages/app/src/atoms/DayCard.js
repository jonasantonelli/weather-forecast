import styled, { css } from 'styled-components'
import AverageDegree from 'atoms/AverageDegree'
import CurrentDegree from 'atoms/CurrentDegree'
import WeatherIcon from 'atoms/WeatherIcon'
import Humidity from 'atoms/Humidity'
import Wind from 'atoms/Wind'
import { useHistory } from 'react-router-dom'

const Day = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
`

const Root = styled.div`
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  padding: 13px;
  border-radius: 12px;
  background-color: var(--card-background);
  font-weight: bold;

  ${({ isToday }) =>
    isToday &&
    css`
      grid-area: today;

      ${Day} {
        font-size: 17px;
      }
    `}

  small {
    color: var(--secondary-color);
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Footer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`

const Condition = styled.div`
  display: flex;
  gap: 20px;
`

const DayCard = ({
  id,
  location,
  temp,
  today,
  min,
  title,
  subtitle,
  weather,
  period,
  ...rest
}) => {
  const history = useHistory()

  const handleClick = () => {
    history.push(`/${id}`)
  }

  return (
    <Root {...rest} role="button" isToday={today} onClick={handleClick}>
      <Header>
        <Day>
          {title}
          <small>{subtitle}</small>
        </Day>
        <WeatherIcon weather={weather} />
      </Header>

      <Footer>
        {today ? (
          <>
            <CurrentDegree>{temp}</CurrentDegree>
            <Condition>
              <Humidity value={10} />
              <Wind value={Math.round(5.4)} />
            </Condition>
          </>
        ) : (
          <AverageDegree min={min} average={temp} />
        )}
      </Footer>
    </Root>
  )
}
export default DayCard
