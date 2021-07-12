import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles }  from '../src/lib/Alurakutcommons';


const GlobalStyle = createGlobalStyle`
  :root{
    --background-secondary: #F1F9FE;
    --background-default: #D9E6F6;
    --primary-text: #2E7BB4;
    --secondary-text: #388BB0;
    --tertiary-text: #2F4A71;
    --primary-element: #6F92BB;
    --another-element: #5579A1;
  }
  /* Reset CSS */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: var(--background-default);
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  } 

  img {
    max-width:100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
