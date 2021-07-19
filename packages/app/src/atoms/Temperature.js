import styled from 'styled-components'

const Root = styled.div`
  font-size: 20px;
  display: flex;
  gap: 4px;

  > span {
    font-weight: 600;
    display: flex;
    align-items: flex-start;

    &:after {
      font-size: 12px;
      content: '°';
    }
  }

  small {
    color: var(--color-secondary);
    font-size: 14px;
    font-weight: normal;
  }

  small:last-child {
    display: flex;
    align-items: flex-start;

    &:after {
      font-size: 10px;
      content: '°';
    }
  }
`

const Temperature = ({ min, max }) => (
  <Root>
    <span>{max}</span>
    <small>/</small>
    <small>{min}</small>
  </Root>
)

export default Temperature
