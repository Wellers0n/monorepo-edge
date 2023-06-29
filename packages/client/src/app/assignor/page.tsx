'use client'
import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
// import Card from '@/components/Card'
// import EarningsTable from '@/components/EarningsTable'

type Submit = {
  email: string
  password: string
}

const Dashboard = () => {
  return (
    <Stack>
      <Grid container spacing={3} justifyContent={'center'}>
        Assignors
      </Grid>
      {/* <Grid container mt={5} justifyContent={'flex-start'}>
        <EarningsTable />
      </Grid> */}
    </Stack>
  )
}

export default Dashboard
