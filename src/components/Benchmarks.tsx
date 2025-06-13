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
  Checkbox,
  FormGroup,
  FormControlLabel,
  Tooltip as MuiTooltip,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Info as InfoIcon } from '@mui/icons-material';

// Sample data for benchmark comparison
const benchmarkData = [
  { company: 'AAPL', value: 15.2, percentile: 90 },
  { company: 'GOOGL', value: 12.5, percentile: 75 },
  { company: 'MSFT', value: 11.8, percentile: 70 },
  { company: 'AMZN', value: 10.5, percentile: 65 },
  { company: 'META', value: 9.8, percentile: 60 },
];

const years = ['2020', '2021', '2022', '2023'];
const metrics = [
  { value: 'revenue', label: 'Revenue Growth' },
  { value: 'ebitda', label: 'EBITDA Margin' },
  { value: 'fcf', label: 'FCF Yield' },
  { value: 'roic', label: 'ROIC' },
];

const companies = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META'];

export default function Benchmarks() {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(companies);

  const handleYearChange = (event: SelectChangeEvent) => {
    setSelectedYear(event.target.value);
  };

  const handleMetricChange = (event: SelectChangeEvent) => {
    setSelectedMetric(event.target.value);
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const company = event.target.name;
    if (event.target.checked) {
      setSelectedCompanies([...selectedCompanies, company]);
    } else {
      setSelectedCompanies(selectedCompanies.filter((c) => c !== company));
    }
  };

  const getMetricLabel = (value: string) => {
    return metrics.find((m) => m.value === value)?.label || value;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Controls Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Benchmark Comparison
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
                <InputLabel>Metrics</InputLabel>
                <Select value={selectedMetric} onChange={handleMetricChange}>
                  {metrics.map((metric) => (
                    <MenuItem key={metric.value} value={metric.value}>
                      {metric.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormGroup>
                <Typography variant="subtitle2" gutterBottom>
                  Companies
                  <MuiTooltip title="Select companies to compare">
                    <InfoIcon fontSize="small" sx={{ ml: 1 }} />
                  </MuiTooltip>
                </Typography>
                <Grid container>
                  {companies.map((company) => (
                    <Grid item xs={6} key={company}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedCompanies.includes(company)}
                            onChange={handleCompanyChange}
                            name={company}
                          />
                        }
                        label={company}
                      />
                    </Grid>
                  ))}
                </Grid>
              </FormGroup>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Visualization */}
      <Card>
        <CardContent>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={benchmarkData.filter((d) =>
                  selectedCompanies.includes(d.company)
                )}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="company"
                  type="category"
                  width={80}
                />
                <Tooltip />
                <Legend />
                <ReferenceLine
                  x={12.5}
                  stroke="#DB3B3B"
                  label={{ value: '75th Percentile', position: 'top' }}
                />
                <ReferenceLine
                  x={15.0}
                  stroke="#143A38"
                  label={{ value: '90th Percentile', position: 'top' }}
                />
                <Bar
                  dataKey="value"
                  fill="#69B2AB"
                  name={getMetricLabel(selectedMetric)}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
} 