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
  Divider,
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
  LineChart,
  Line,
  Scatter,
} from 'recharts';
import { Info as InfoIcon } from '@mui/icons-material';

// Sample data for benchmark comparison
const benchmarkData = [
  // Portfolio Companies Group
  { company: 'Portfolio Companies', value: null, group: 'header' },
  { company: 'AAPL', value: 15.2, percentile: 90, group: 'portfolio' },
  { company: 'GOOGL', value: 12.5, percentile: 75, group: 'portfolio' },
  { company: 'MSFT', value: 11.8, percentile: 70, group: 'portfolio' },
  { company: 'AMZN', value: 10.5, percentile: 65, group: 'portfolio' },
  { company: 'META', value: 9.8, percentile: 60, group: 'portfolio' },
  
  // Benchmarks Group
  { company: 'Benchmarks', value: null, group: 'header' },
  { company: 'Bench 1', value: 14.5, percentile: 85, group: 'benchmarks' },
  { company: 'Bench 2', value: 13.2, percentile: 80, group: 'benchmarks' },
  { company: 'Bench 3', value: 11.8, percentile: 75, group: 'benchmarks' },
  { company: 'Bench 4', value: 10.5, percentile: 70, group: 'benchmarks' },
  { company: 'Bench 5', value: 9.2, percentile: 65, group: 'benchmarks' },
  
  // Selected Companies Group
  { company: 'Selected Companies', value: null, group: 'header' },
  { company: 'Select 1', value: 13.8, percentile: 82, group: 'selected' },
  { company: 'Select 2', value: 12.5, percentile: 78, group: 'selected' },
  { company: 'Select 3', value: 11.2, percentile: 72, group: 'selected' },
];

// Sample time series data
const timeSeriesData = {
  AAPL: [
    { year: '2020', value: 12.5, p50: 9.0, p75: 11.0, p90: 13.0 },
    { year: '2021', value: 13.2, p50: 9.2, p75: 11.2, p90: 13.2 },
    { year: '2022', value: 14.0, p50: 9.4, p75: 11.4, p90: 13.4 },
    { year: '2023', value: 15.2, p50: 9.6, p75: 11.6, p90: 13.6 },
  ],
  GOOGL: [
    { year: '2020', value: 11.0, p50: 9.0, p75: 11.0, p90: 13.0 },
    { year: '2021', value: 11.5, p50: 9.2, p75: 11.2, p90: 13.2 },
    { year: '2022', value: 12.0, p50: 9.4, p75: 11.4, p90: 13.4 },
    { year: '2023', value: 12.5, p50: 9.6, p75: 11.6, p90: 13.6 },
  ],
  // Add more companies as needed
};

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
  const [selectedTimeSeriesCompanies, setSelectedTimeSeriesCompanies] = useState<string[]>(['AAPL']);

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

  const handleTimeSeriesCompanyChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedTimeSeriesCompanies(event.target.value as string[]);
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
            Metric Benchmarks
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
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={benchmarkData.filter((d) =>
                  d.group === 'header' || 
                  (d.group === 'benchmarks') || 
                  (d.group === 'portfolio' && selectedCompanies.includes(d.company)) ||
                  (d.group === 'selected' && selectedCompanies.includes(d.company))
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
                  x={10.0}
                  stroke="#82ca9d"
                  strokeDasharray="3 3"
                  label={{ value: '50th Percentile', position: 'top' }}
                />
                <ReferenceLine
                  x={12.5}
                  stroke="#ffc658"
                  strokeDasharray="3 3"
                  label={{ value: '75th Percentile', position: 'top' }}
                />
                <ReferenceLine
                  x={15.0}
                  stroke="#ff8042"
                  strokeDasharray="3 3"
                  label={{ value: '90th Percentile', position: 'top' }}
                />
                <Bar
                  dataKey="value"
                  fill="#69B2AB"
                  name={getMetricLabel(selectedMetric)}
                />
                <Scatter
                  data={benchmarkData.filter((d) =>
                    (d.group === 'portfolio' || d.group === 'selected') && 
                    selectedCompanies.includes(d.company)
                  )}
                  dataKey="value"
                  fill="#FF8042"
                  name="Current Value"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      {/* Time Series Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Historical Trend
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Companies</InputLabel>
                <Select
                  multiple
                  value={selectedTimeSeriesCompanies}
                  onChange={handleTimeSeriesCompanyChange}
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
          <Box sx={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                {selectedTimeSeriesCompanies.map((company) => (
                  <Line
                    key={company}
                    type="monotone"
                    data={timeSeriesData[company as keyof typeof timeSeriesData]}
                    dataKey="value"
                    name={company}
                    stroke="#8884d8"
                  />
                ))}
                <Line
                  type="monotone"
                  data={timeSeriesData[selectedTimeSeriesCompanies[0] as keyof typeof timeSeriesData]}
                  dataKey="p50"
                  name="50th Percentile"
                  stroke="#82ca9d"
                  strokeDasharray="3 3"
                  strokeOpacity={0.3}
                />
                <Line
                  type="monotone"
                  data={timeSeriesData[selectedTimeSeriesCompanies[0] as keyof typeof timeSeriesData]}
                  dataKey="p75"
                  name="75th Percentile"
                  stroke="#ffc658"
                  strokeDasharray="3 3"
                  strokeOpacity={0.3}
                />
                <Line
                  type="monotone"
                  data={timeSeriesData[selectedTimeSeriesCompanies[0] as keyof typeof timeSeriesData]}
                  dataKey="p90"
                  name="90th Percentile"
                  stroke="#ff8042"
                  strokeDasharray="3 3"
                  strokeOpacity={0.3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
} 