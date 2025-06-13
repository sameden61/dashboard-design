import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data for historical trend
const historicalData = [
  { period: '2020 Q1', p90: 12.5, p75: 10.2, p50: 8.1 },
  { period: '2020 Q2', p90: 13.2, p75: 10.8, p50: 8.5 },
  { period: '2020 Q3', p90: 14.0, p75: 11.3, p50: 8.8 },
  { period: '2020 Q4', p90: 14.5, p75: 11.7, p50: 9.0 },
  { period: '2021 Q1', p90: 15.2, p75: 12.1, p50: 9.3 },
  { period: '2021 Q2', p90: 15.8, p75: 12.5, p50: 9.6 },
];

// Sample statistics data
const statisticsData = [
  { metric: 'Average', p90: 14.2, p75: 11.4, p50: 8.9 },
  { metric: 'Std Dev', p90: 1.2, p75: 0.9, p50: 0.6 },
  { metric: 'Min', p90: 12.5, p75: 10.2, p50: 8.1 },
  { metric: 'Max', p90: 15.8, p75: 12.5, p50: 9.6 },
];

export default function MarketMultiple() {
  const [percentiles, setPercentiles] = useState({
    p90: 15.8,
    p75: 12.5,
    p50: 9.6,
  });

  const handleInputChange = (field: keyof typeof percentiles) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPercentiles({
      ...percentiles,
      [field]: parseFloat(event.target.value) || 0,
    });
  };

  const handleUpdate = () => {
    // In a real application, this would update the calculations
    console.log('Updating calculations with:', percentiles);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Manual Inputs Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Market Multiple Analysis
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="90th Percentile"
                    type="number"
                    value={percentiles.p90}
                    onChange={handleInputChange('p90')}
                    InputProps={{ inputProps: { step: 0.1 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="75th Percentile"
                    type="number"
                    value={percentiles.p75}
                    onChange={handleInputChange('p75')}
                    InputProps={{ inputProps: { step: 0.1 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="50th Percentile"
                    type="number"
                    value={percentiles.p50}
                    onChange={handleInputChange('p50')}
                    InputProps={{ inputProps: { step: 0.1 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    sx={{ mt: 2 }}
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Historical Charts Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Historical Trend (L2 Cumulative)
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="p90"
                      stroke="#143A38"
                      name="90th Percentile"
                    />
                    <Line
                      type="monotone"
                      dataKey="p75"
                      stroke="#DB3B3B"
                      name="75th Percentile"
                    />
                    <Line
                      type="monotone"
                      dataKey="p50"
                      stroke="#D17800"
                      name="50th Percentile"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistics Table Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistical Summary
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Metric</TableCell>
                      <TableCell align="right">90th Percentile</TableCell>
                      <TableCell align="right">75th Percentile</TableCell>
                      <TableCell align="right">50th Percentile</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {statisticsData.map((row) => (
                      <TableRow key={row.metric}>
                        <TableCell component="th" scope="row">
                          {row.metric}
                        </TableCell>
                        <TableCell align="right">{row.p90.toFixed(1)}</TableCell>
                        <TableCell align="right">{row.p75.toFixed(1)}</TableCell>
                        <TableCell align="right">{row.p50.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 