import React from 'react'
import type { FC } from 'react'
import { Box, Card, CardHeader, CardContent, Divider, makeStyles } from '@material-ui/core'
import LineChart from './LineChart'
import moment from 'moment'

interface TokenData {
  priceUSD: string
  date: number
}

interface ChartProps {
  className?: string
  tokenData: TokenData[]
}

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    display: 'flex',
    height: '100%',
  },
}))

const Chart: FC<ChartProps> = ({ className, tokenData, ...rest }) => {
  const classes = useStyles()

  // For now just show 1 month
  const tokenDataFiltered = tokenData.filter((tokenData) =>
    moment.unix(tokenData.date).isAfter(moment().subtract(1, 'months')),
  )

  const chartData = {
    thisMonth: {
      data: tokenDataFiltered.map((tokenData) => tokenData.priceUSD), // [10, 5, 11, 20, 13, 28, 18, 4, 13, 12, 13, 5],
      labels: tokenDataFiltered.map((tokenData) => moment.unix(tokenData.date).format('DD/MM')), // ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  }

  return (
    <Card className={classes.root} {...rest}>
      <CardHeader title="ETH/USD" />
      <Divider />
      <CardContent>
        <Box height={340}>
          <LineChart className={classes.chart} data={chartData.thisMonth.data} labels={chartData.thisMonth.labels} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default Chart
