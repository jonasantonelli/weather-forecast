import styled from 'styled-components'

const Root = styled.div`
  font-size: 48px;
  text-align: center;

  margin: 50px auto;

  small {
    display: block;
    margin-top: 5px;
    font-size: 26px;
  }
`

function ErrorMessage({ error, ...rest }) {
  return (
    <Root role="alert" {...rest}>
      <span>Oops!</span>
      <small>Something's gone wrong: {error.message}</small>
    </Root>
  )
}

export default ErrorMessage
