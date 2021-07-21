import styled from 'styled-components'

const Root = styled.div`
  font-size: 20px;
  display: flex;
  gap: 3px;
  align-items: center;
`

const Average = styled.span`
  font-weight: 600;
  display: flex;
  line-height: 17px;

  &:after {
    font-size: 12px;
    content: '°';
  }
`

const Divider = styled.small`
  color: var(--secondary-color);
  font-size: 14px;
  font-weight: normal;
`

const Min = styled(Divider)`
  display: flex;
  align-items: flex-start;

  &:after {
    font-size: 10px;
    content: '°';
  }
`

const Degree = ({ min, average }) => (
  <Root>
    <Average>{average}</Average>
    <Divider>/</Divider>
    <Min>{min}</Min>
  </Root>
)

export default Degree
