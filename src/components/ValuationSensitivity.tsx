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
} from '@mui/material';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

// Sample data for Revenue Growth vs Scale
const revenueGrowthData = [
  { scale: 1.0, growth: 0.1 },
  { scale: 1.2, growth: 0.15 },
  { scale: 1.4, growth: 0.2 },
  { scale: 1.6, growth: 0.25 },
  { scale: 1.8, growth: 0.3 },
  { scale: 2.0, growth: 0.35 },
];

// Sample data for Revenue vs FCF
const revenueFcfData = [
  { revenue: 1000000, fcf: 200000 },
  { revenue: 1500000, fcf: 350000 },
  { revenue: 2000000, fcf: 500000 },
  { revenue: 2500000, fcf: 650000 },
  { revenue: 3000000, fcf: 800000 },
];

// Sample data for Revenue vs OPEX
const revenueOpexData = [
  { revenue: 1000000, opex: 800000 },
  { revenue: 1500000, opex: 1150000 },
  { revenue: 2000000, opex: 1500000 },
  { revenue: 2500000, opex: 1850000 },
  { revenue: 3000000, opex: 2200000 },
];

const years = ['2020', '2021', '2022', '2023'];
const multiples = ['Revenue', 'EBITDA', 'FCF'];
const companies = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];

export default function ValuationSensitivity() {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedMultiple, setSelectedMultiple] = useState('Revenue');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };

  const handleMultipleChange = (event: SelectChangeEvent) => {
    setSelectedMultiple(event.target.value);
  };

  const handleCompanyChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedCompanies(event.target.value as string[]);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Controls Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Valuation Sensitivity Analysis
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Multiple</InputLabel>
                <Select value={selectedMultiple} onChange={handleMultipleChange}>
                  {multiples.map((multiple) => (
                    <MenuItem key={multiple} value={multiple}>
                      {multiple}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
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
        {/* Revenue Growth vs Scale */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Growth vs Scale
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="scale" name="Scale Factor" />
                    <YAxis dataKey="growth" name="Revenue Growth" />
                    <Tooltip />
                    <Legend />
                    <Scatter
                      data={revenueGrowthData}
                      fill="#143A38"
                      name="Growth Impact"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue vs FCF */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue vs FCF
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="revenue" name="Revenue" />
                    <YAxis dataKey="fcf" name="FCF" />
                    <Tooltip />
                    <Legend />
                    <Scatter
                      data={revenueFcfData}
                      fill="#DB3B3B"
                      name="FCF Correlation"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue vs OPEX */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue vs OPEX
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueOpexData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="revenue" />
                    <YAxis dataKey="opex" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="opex"
                      stroke="#D17800"
                      name="Operating Expenses"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 