import React from 'react'
import type { FC } from 'react'
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
  Typography,
  TextField,
  Grid,
  Button,
} from '@material-ui/core'

const RepayCard: FC = ({ ...rest }) => {
  const performance = {
    thisWeek: {
      data: [],
      labels: [],
    },
    thisMonth: {
      data: [],
      labels: [],
    },
    thisYear: {
      data: [10, 5, 11, 20, 13, 28, 18, 4, 13, 12, 13, 5],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  }

  return (
    <Card {...rest}>
      <CardHeader title="Repay" />
      <Divider />
      <CardContent>
        <Box>
          <Box>
            <Typography align="center" variant="h5" color="textPrimary">
              Limit Order
            </Typography>
          </Box>
          <Box mt={3}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <TextField id="filled-error-helper-text" label="Price" helperText="Invalid Price." variant="filled" />
              </Grid>
            </Grid>
          </Box>
          <Box mt={3} display="flex" alignItems="center" justifyContent="center">
            <Button variant="outlined">Submit Order</Button>
          </Box>
          <Box mt={5}>
            <Typography align="center" variant="subtitle1" color="textPrimary">
              At X price you will repay and your collateralization ratio will be YY and blablabla...
            </Typography>
            <br></br>
            <Typography align="center" variant="h5" color="textPrimary">
              [ENTER USEFUL INFO HERE]
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RepayCard
