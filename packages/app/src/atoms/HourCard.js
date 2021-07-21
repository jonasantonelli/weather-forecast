import styled, { css } from 'styled-components'
import Degree from 'atoms/Degree'
import Humidity from 'atoms/Humidity'
import Wind from 'atoms/Wind'

const Root = styled.div`
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
    color: var(--secondary-color);
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 15px;
`

const Hour = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
`

const HourCard = ({ hour, temp, wind_speed, humidity }) => {
  return (
    <Root>
      <Header>
        <Hour>{hour}:00</Hour>
        <Degree>{temp}</Degree>
      </Header>

      <Footer>
        <Humidity value={humidity} />
        <Wind value={Math.round(wind_speed)} />
      </Footer>
    </Root>
  )
}
export default HourCard
