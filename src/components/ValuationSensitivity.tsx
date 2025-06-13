import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

// Sample data for heatmaps
const revenueGrowthData = [
  { ltmRev: '1M', growth: '10%', value: 5.2 },
  { ltmRev: '1M', growth: '20%', value: 6.1 },
  { ltmRev: '1M', growth: '30%', value: 7.3 },
  { ltmRev: '5M', growth: '10%', value: 4.8 },
  { ltmRev: '5M', growth: '20%', value: 5.6 },
  { ltmRev: '5M', growth: '30%', value: 6.7 },
  { ltmRev: '10M', growth: '10%', value: 4.5 },
  { ltmRev: '10M', growth: '20%', value: 5.2 },
  { ltmRev: '10M', growth: '30%', value: 6.3 },
];

const ntmFcfData = [
  { ntmRev: '1M', fcf: '10%', value: 4.8 },
  { ntmRev: '1M', fcf: '20%', value: 5.9 },
  { ntmRev: '1M', fcf: '30%', value: 7.1 },
  { ntmRev: '5M', fcf: '10%', value: 4.5 },
  { ntmRev: '5M', fcf: '20%', value: 5.4 },
  { ntmRev: '5M', fcf: '30%', value: 6.5 },
  { ntmRev: '10M', fcf: '10%', value: 4.2 },
  { ntmRev: '10M', fcf: '20%', value: 5.0 },
  { ntmRev: '10M', fcf: '30%', value: 6.1 },
];

const ntmOpexData = [
  { ntmRev: '1M', opex: '60%', value: 5.5 },
  { ntmRev: '1M', opex: '70%', value: 4.8 },
  { ntmRev: '1M', opex: '80%', value: 4.2 },
  { ntmRev: '5M', opex: '60%', value: 5.2 },
  { ntmRev: '5M', opex: '70%', value: 4.5 },
  { ntmRev: '5M', opex: '80%', value: 3.9 },
  { ntmRev: '10M', opex: '60%', value: 4.9 },
  { ntmRev: '10M', opex: '70%', value: 4.3 },
  { ntmRev: '10M', opex: '80%', value: 3.7 },
];

const marketMultiplesData = [
  { ticker: 'AAPL', revenue: 5.2, ebitda: 12.5, fcf: 15.8 },
  { ticker: 'GOOGL', revenue: 4.8, ebitda: 11.2, fcf: 14.5 },
  { ticker: 'MSFT', revenue: 5.5, ebitda: 13.1, fcf: 16.2 },
  { ticker: 'AMZN', revenue: 4.2, ebitda: 10.8, fcf: 13.9 },
];

const years = ['2020', '2021', '2022', '2023'];
const companies = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];
const multiples = ['Revenue', 'EBITDA', 'FCF'];

export default function ValuationSensitivity() {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };

  const handleCompanyChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedCompanies(event.target.value as string[]);
  };

  const getHeatmapColor = (value: number) => {
    const normalizedValue = (value - 3) / 5; // Assuming values range from 3 to 8
    return `rgb(${255 * (1 - normalizedValue)}, ${255 * normalizedValue}, 0)`;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Controls Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Valuation Model Sensitivity
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select value={selectedYear} onChange={handleYearChange}>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Companies</InputLabel>
                <Select
                  multiple
                  value={selectedCompanies}
                  onChange={handleCompanyChange}
                  renderValue={(selected) => (selected as string[]).join(', ')}
                >
                  {companies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Revenue Growth vs LTM Rev */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Revenue Growth vs LTM Rev
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>LTM Rev</TableCell>
                          <TableCell>10%</TableCell>
                          <TableCell>20%</TableCell>
                          <TableCell>30%</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {['1M', '5M', '10M'].map((ltmRev) => (
                          <TableRow key={ltmRev}>
                            <TableCell>{ltmRev}</TableCell>
                            {['10%', '20%', '30%'].map((growth) => {
                              const data = revenueGrowthData.find(
                                (d) => d.ltmRev === ltmRev && d.growth === growth
                              );
                              return (
                                <TableCell
                                  key={growth}
                                  sx={{
                                    backgroundColor: getHeatmapColor(data?.value || 0),
                                  }}
                                >
                                  {data?.value.toFixed(1)}x
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* NTM Rev vs FCF */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    NTM Rev vs FCF
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>NTM Rev</TableCell>
                          <TableCell>10%</TableCell>
                          <TableCell>20%</TableCell>
                          <TableCell>30%</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {['1M', '5M', '10M'].map((ntmRev) => (
                          <TableRow key={ntmRev}>
                            <TableCell>{ntmRev}</TableCell>
                            {['10%', '20%', '30%'].map((fcf) => {
                              const data = ntmFcfData.find(
                                (d) => d.ntmRev === ntmRev && d.fcf === fcf
                              );
                              return (
                                <TableCell
                                  key={fcf}
                                  sx={{
                                    backgroundColor: getHeatmapColor(data?.value || 0),
                                  }}
                                >
                                  {data?.value.toFixed(1)}x
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* NTM Rev vs OPEX */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    NTM Rev vs OPEX
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>NTM Rev</TableCell>
                          <TableCell>60%</TableCell>
                          <TableCell>70%</TableCell>
                          <TableCell>80%</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {['1M', '5M', '10M'].map((ntmRev) => (
                          <TableRow key={ntmRev}>
                            <TableCell>{ntmRev}</TableCell>
                            {['60%', '70%', '80%'].map((opex) => {
                              const data = ntmOpexData.find(
                                (d) => d.ntmRev === ntmRev && d.opex === opex
                              );
                              return (
                                <TableCell
                                  key={opex}
                                  sx={{
                                    backgroundColor: getHeatmapColor(data?.value || 0),
                                  }}
                                >
                                  {data?.value.toFixed(1)}x
                                </TableCell>
                              );
                            })}
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

        <Grid item xs={12} md={0.5}>
          <Divider orientation="vertical" flexItem sx={{ height: '100%' }} />
        </Grid>

        {/* Market Multiples */}
        <Grid item xs={12} md={3.5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Market Multiples
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Ticker</TableCell>
                      <TableCell>6.0x</TableCell>
                      <TableCell>8.0x</TableCell>
                      <TableCell>10.0x</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {marketMultiplesData.map((row) => (
                      <TableRow key={row.ticker}>
                        <TableCell>{row.ticker}</TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: getHeatmapColor(6.0),
                          }}
                        >
                          6.0x
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: getHeatmapColor(8.0),
                          }}
                        >
                          8.0x
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: getHeatmapColor(10.0),
                          }}
                        >
                          10.0x
                        </TableCell>
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