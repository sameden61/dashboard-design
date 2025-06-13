import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// Sample data for summary cards
const summaryData = {
  currentPercentile: 85,
  revenueMultiple: 12.5,
  ebitdaMultiple: 15.2,
  fcfMultiple: 18.3,
};

// Sample data for company rankings
const companyRankings = [
  { ticker: 'AAPL', currentPercentile: 90, revenueMultiple: 13.2, ebitdaMultiple: 16.5, fcfMultiple: 19.8 },
  { ticker: 'GOOGL', currentPercentile: 85, revenueMultiple: 12.5, ebitdaMultiple: 15.2, fcfMultiple: 18.3 },
  { ticker: 'MSFT', currentPercentile: 80, revenueMultiple: 11.8, ebitdaMultiple: 14.5, fcfMultiple: 17.6 },
  { ticker: 'AMZN', currentPercentile: 75, revenueMultiple: 11.2, ebitdaMultiple: 13.8, fcfMultiple: 16.9 },
];

// Sample data for conversion reference
const conversionReference = [
  { percentileRange: '90th-95th', revenueMultipleRange: '13.0x-15.0x' },
  { percentileRange: '85th-90th', revenueMultipleRange: '12.0x-13.0x' },
  { percentileRange: '80th-85th', revenueMultipleRange: '11.0x-12.0x' },
  { percentileRange: '75th-80th', revenueMultipleRange: '10.0x-11.0x' },
  { percentileRange: '70th-75th', revenueMultipleRange: '9.0x-10.0x' },
];

const getColorForPercentile = (percentile: number) => {
  if (percentile >= 85) return 'success.main';
  if (percentile >= 75) return 'warning.main';
  return 'error.main';
};

export default function PercentileCheck() {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: getColorForPercentile(summaryData.currentPercentile) }}>
                <CardContent>
                  <Typography variant="h6" color="white">
                    Current Percentile
                  </Typography>
                  <Typography variant="h4" color="white">
                    {summaryData.currentPercentile}th
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Revenue Multiple</Typography>
                  <Typography variant="h4">{summaryData.revenueMultiple}x</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">EBITDA Multiple</Typography>
                  <Typography variant="h4">{summaryData.ebitdaMultiple}x</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6">FCF Multiple</Typography>
                  <Typography variant="h4">{summaryData.fcfMultiple}x</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Company Rankings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Portfolio Company Rankings
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Ticker</TableCell>
                      <TableCell>Current Percentile</TableCell>
                      <TableCell>Revenue Multiple</TableCell>
                      <TableCell>EBITDA Multiple</TableCell>
                      <TableCell>FCF Multiple</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companyRankings.map((row) => (
                      <TableRow key={row.ticker}>
                        <TableCell>{row.ticker}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={row.currentPercentile}
                                sx={{
                                  height: 10,
                                  borderRadius: 5,
                                  bgcolor: 'grey.200',
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: getColorForPercentile(row.currentPercentile),
                                  },
                                }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {row.currentPercentile}th
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{row.revenueMultiple}x</TableCell>
                        <TableCell>{row.ebitdaMultiple}x</TableCell>
                        <TableCell>{row.fcfMultiple}x</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Conversion Reference */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Percentile to Revenue Multiple Conversion
              </Typography>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search percentiles..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Percentile Range</TableCell>
                      <TableCell>Revenue Multiple Range</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {conversionReference.map((row) => (
                      <TableRow key={row.percentileRange}>
                        <TableCell>{row.percentileRange}</TableCell>
                        <TableCell>{row.revenueMultipleRange}</TableCell>
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