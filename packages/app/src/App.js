import { ErrorBoundary } from 'react-error-boundary'
import styled from 'styled-components'
import ErrorMessage from 'atoms/ErrorMessage'
import Search from 'organism/Search'
import Main from 'organism/Main'

const Root = styled.main`
  padding: 0 12px 12px;
  max-width: 1000px;
  margin: auto;
`

function App() {
  return (
    <Root>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Search />
        <Main />
      </ErrorBoundary>
    </Root>
  )
}

export default App
