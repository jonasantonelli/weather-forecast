import styled from 'styled-components'

const Degree = styled.div`
  font-weight: normal;
  display: flex;
  font-size: 38px;
  line-height: 42px;

  &:after {
    content: '°';
  }
`

export default Degree
