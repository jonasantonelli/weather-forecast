import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --background: #081c24;
    --card-background: #162c39;
    --tertiary-color: #6d84936c;
    --secondary-color: #899ba7;
    --primary-color: #1bcdce;
    --text-color: #ffffff;
  }

  html {
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -ms-flex: 0 1 auto;
  }

  body {
    font-size: 14px;
    margin: 0;
    font-family: 'Nunito', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background);
    color: var(--text-color);
  }

  
`

export default GlobalStyle
