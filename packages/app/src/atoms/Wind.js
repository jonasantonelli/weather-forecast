import styled from 'styled-components'
import wind from 'icons/wind.png'

const Root = styled.div`
  display: flex;
  align-items: center;
`

const Img = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 7px;
`

const Wind = ({ value }) => (
  <Root>
    <Img src={wind} alt="Wind icon" />
    <span>{value}km/h</span>
  </Root>
)

export default Wind
