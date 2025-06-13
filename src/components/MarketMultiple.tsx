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

// Sample data for historical trend - Last 24 months
const last24MonthsData = [
  { period: '2023-01', p90: 15.2, p75: 12.1, p50: 9.3 },
  { period: '2023-02', p90: 15.4, p75: 12.2, p50: 9.4 },
  { period: '2023-03', p90: 15.6, p75: 12.3, p50: 9.5 },
  { period: '2023-04', p90: 15.8, p75: 12.5, p50: 9.6 },
  // ... Add more months as needed
];

// Sample data for historical trend - Last 10 years
const last10YearsData = [
  { period: '2014-01', p90: 12.5, p75: 10.2, p50: 8.1 },
  { period: '2014-02', p90: 12.7, p75: 10.3, p50: 8.2 },
  { period: '2014-03', p90: 12.9, p75: 10.4, p50: 8.3 },
  // ... Add more months as needed
];

// Updated statistics data structure for 24 months
const statistics24MonthsData = [
  { percentile: '90th', average: 15.4, stdDev: 0.3 },
  { percentile: '75th', average: 12.3, stdDev: 0.2 },
  { percentile: '50th', average: 9.5, stdDev: 0.2 },
  { percentile: 'Mean', average: 12.4, stdDev: 0.2 },
];

// Updated statistics data structure for 10 years
const statistics10YearsData = [
  { percentile: '90th', average: 14.2, stdDev: 1.2 },
  { percentile: '75th', average: 11.4, stdDev: 0.9 },
  { percentile: '50th', average: 8.9, stdDev: 0.6 },
  { percentile: 'Mean', average: 11.5, stdDev: 0.9 },
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
    console.log('Updating calculations with:', percentiles);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Manual Inputs Section - Full Width, Vertical Stack */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Market Multiple Analysis
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      fullWidth
                      label="90th Percentile"
                      type="number"
                      value={percentiles.p90}
                      onChange={handleInputChange('p90')}
                      InputProps={{ inputProps: { step: 0.1 } }}
                    />
                    <TextField
                      fullWidth
                      label="75th Percentile"
                      type="number"
                      value={percentiles.p75}
                      onChange={handleInputChange('p75')}
                      InputProps={{ inputProps: { step: 0.1 } }}
                    />
                    <TextField
                      fullWidth
                      label="50th Percentile"
                      type="number"
                      value={percentiles.p50}
                      onChange={handleInputChange('p50')}
                      InputProps={{ inputProps: { step: 0.1 } }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdate}
                      sx={{ mt: 2 }}
                    >
                      Update
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Multiple Explanation"
                    placeholder="Enter explanation of the market multiple inputs..."
                    sx={{ height: '100%' }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Historical Charts Section - Two Time Periods */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Last 24 Months Chart */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Last 24 Months Trend
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={last24MonthsData}>
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

            {/* Last 10 Years Chart */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Last 10 Years Trend
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={last10YearsData}>
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
          </Grid>
        </Grid>

        {/* Statistics Tables Section - Two Time Periods */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Last 24 Months Statistics */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Last 24 Months Statistics
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Percentile</TableCell>
                          <TableCell align="right">Average</TableCell>
                          <TableCell align="right">Std. Dev.</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {statistics24MonthsData.map((row) => (
                          <TableRow key={row.percentile}>
                            <TableCell component="th" scope="row">
                              {row.percentile}
                            </TableCell>
                            <TableCell align="right">{row.average.toFixed(1)}</TableCell>
                            <TableCell align="right">{row.stdDev.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Last 10 Years Statistics */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Last 10 Years Statistics
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Percentile</TableCell>
                          <TableCell align="right">Average</TableCell>
                          <TableCell align="right">Std. Dev.</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {statistics10YearsData.map((row) => (
                          <TableRow key={row.percentile}>
                            <TableCell component="th" scope="row">
                              {row.percentile}
                            </TableCell>
                            <TableCell align="right">{row.average.toFixed(1)}</TableCell>
                            <TableCell align="right">{row.stdDev.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
} 