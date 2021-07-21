import styled from 'styled-components'
import humidity from 'icons/humidity.png'

const Root = styled.div`
  display: flex;
  align-items: center;
`

const Img = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 7px;
`

const Humidity = ({ value }) => (
  <Root>
    <Img src={humidity} alt="Humidity icon" />
    <span>{value}%</span>
  </Root>
)

export default Humidity
