import styled from 'styled-components'

const Button = styled.button`
  border: none;
  background: transparent;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  position: relative;
  margin: 0;
  padding: 0 12px;
  height: 40px;
  border: none;
  background-color: transparent;
  white-space: nowrap;

  svg {
    fill: #fff;
    width: 32px;
    height: 32px;
  }
`

export default Button
