import { SignerProvider } from 'contexts/SignerContext'
import { SharedStateProvider } from 'contexts/SharedStateContext'
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({})

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SharedStateProvider>
          <SignerProvider>
            <Component {...pageProps} />
          </SignerProvider>
        </SharedStateProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
