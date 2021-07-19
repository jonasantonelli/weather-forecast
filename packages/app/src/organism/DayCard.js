import styled, { css } from 'styled-components'
import Temperature from 'atoms/Temperature'
import { useHistory } from 'react-router-dom'

const Root = styled.div`
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  padding: 10px;
  border-radius: 12px;
  background-color: var(--card-background);
  font-weight: bold;
  ${({ isToday }) =>
    isToday &&
    css`
      grid-area: today;
    `}

  small {
    color: var(--color-secondary);
  }
`

const Day = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
`

const CurrentTemperature = styled.div`
  font-size: 52px;
  font-weight: normal;
  display: flex;

  &:after {
    margin-top: 10px;
    margin-left: 4px;
    font-size: 18px;
    content: '°C';
  }
`

const DayCard = ({
  date,
  location,
  temp,
  today,
  min,
  max,
  dayMonth,
  dayWeek,
  ...rest
}) => {
  const history = useHistory()

  const handleClick = () => {
    history.push(`/${location}/${date}`)
  }

  return (
    <Root {...rest} role="button" isToday={today} onClick={handleClick}>
      <Day>
        {dayWeek}
        <small>{dayMonth}</small>
      </Day>

      {today ? (
        <CurrentTemperature>{temp}</CurrentTemperature>
      ) : (
        <Temperature min={min} max={max} />
      )}
    </Root>
  )
}
export default DayCard
