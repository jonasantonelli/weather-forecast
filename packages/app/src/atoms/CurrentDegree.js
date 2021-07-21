import styled from 'styled-components'

const TodayDegree = styled.div`
  font-size: 52px;
  font-weight: normal;
  display: flex;
  align-items: center;
  line-height: 43px;

  &:after {
    margin-top: 10px;
    margin-left: 4px;
    font-size: 18px;
    content: '°C';
  }
`

export default TodayDegree
