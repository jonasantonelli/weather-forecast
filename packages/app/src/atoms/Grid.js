import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto;
  gap: 14px;

  @media screen and (min-width: 800px) {
    gap: 22px;
  }
`

export default Grid
