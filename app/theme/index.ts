import { createMuiTheme, Theme, ThemeOptions } from '@material-ui/core'

const themeOptions: ThemeOptions = {
  palette: {
    type: 'dark',
    action: {
      active: 'rgba(255, 255, 255, 0.54)',
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(255, 255, 255, 0.08)',
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)',
    },
    background: {
      default: '#212429',
      paper: '#282C34',
    },
  },
}

export const createTheme = (): Theme => {
  return createMuiTheme(themeOptions)
}
