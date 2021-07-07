import { SignerProvider } from 'contexts/SignerContext'
import { SharedStateProvider } from 'contexts/SharedStateContext'
import { ThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core'
import { createTheme } from 'theme'

export const theme = createTheme()

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
