import React, { useState } from 'react'
import type { FC } from 'react'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Typography,
  Theme,
  fade,
} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'

interface LatestOrdersProps {
  className?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  cancelButton: {
    color: theme.palette.error.main,
    backgroundColor: fade(theme.palette.error.main, 0.08),
  },
  failed: {
    fontSize: 12,
    borderRadius: 2,
    alignItems: 'center',
    display: 'inline-flex',
    padding: theme.spacing(0.5, 1),
    textTransform: 'uppercase',
    color: theme.palette.error.main,
    backgroundColor: fade(theme.palette.error.main, 0.08),
  },
  complete: {
    fontSize: 12,
    borderRadius: 2,
    alignItems: 'center',
    display: 'inline-flex',
    padding: theme.spacing(0.5, 1),
    textTransform: 'uppercase',
    color: theme.palette.success.main,
    backgroundColor: fade(theme.palette.success.main, 0.08),
  },
  pending: {
    fontSize: 12,
    borderRadius: 2,
    alignItems: 'center',
    display: 'inline-flex',
    padding: theme.spacing(0.5, 1),
    textTransform: 'uppercase',
    color: theme.palette.warning.main,
    backgroundColor: fade(theme.palette.warning.main, 0.08),
  },
}))

const OrdersCard: FC<LatestOrdersProps> = ({ className, ...rest }) => {
  const classes = useStyles()
  const timestamp = 'Wed, 27 Jan 22:33'
  const [orders, setOrders] = useState([
    {
      status: 'Pending',
      timestamp,
      price: 1500,
      greaterThan: true,
    },
    {
      status: 'Complete',
      timestamp,
      price: 1100,
      greaterThan: true,
    },
    {
      status: 'Failed',
      timestamp,
      price: 1110,
      greaterThan: false,
    },
  ])

  return (
    <Card>
      <CardHeader title="Orders" />
      <Divider />

      <Box minWidth={700}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Trigger Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, i) => (
              <TableRow hover key={i}>
                <TableCell>{order.timestamp}</TableCell>
                <TableCell>
                  {order.greaterThan ? '> ' : '< '}
                  {order.price} $
                </TableCell>
                <TableCell>
                  <Typography className={classes[order.status.toLowerCase()]}>{order.status}</Typography>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    className={classes.cancelButton}
                    disabled={order.status !== 'Pending'}
                    startIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  )
}

export default OrdersCard
