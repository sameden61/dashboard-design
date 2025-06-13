import React, { useState } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
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
  ReferenceLine,
  ReferenceArea,
} from 'recharts';

// Sample data for summary cards
const summaryData = {
  currentPercentile: 85,
  revenueMultiple: 12.5,
  ebitdaMultiple: 15.2,
  fcfMultiple: 18.3,
};

// Sample data for company rankings
const companyRankings = [
  { ticker: 'AAPL', percentile2030: 90, revenueMultiple: 13.2, ebitdaMultiple: 16.5, fcfMultiple: 19.8 },
  { ticker: 'GOOGL', percentile2030: 85, revenueMultiple: 12.5, ebitdaMultiple: 15.2, fcfMultiple: 18.3 },
  { ticker: 'MSFT', percentile2030: 80, revenueMultiple: 11.8, ebitdaMultiple: 14.5, fcfMultiple: 17.6 },
  { ticker: 'AMZN', percentile2030: 75, revenueMultiple: 11.2, ebitdaMultiple: 13.8, fcfMultiple: 16.9 },
];

// Sample data for latest percentiles
const latestPercentiles = [
  { ticker: 'AAPL', latestPercentile: 92 },
  { ticker: 'GOOGL', latestPercentile: 87 },
  { ticker: 'MSFT', latestPercentile: 82 },
  { ticker: 'AMZN', latestPercentile: 77 },
];

// Sample data for scatter plots
const scatterDataLTM = [
  { ticker: 'AAPL', avgPercentile: 90, stdDev: 2.5 },
  { ticker: 'GOOGL', avgPercentile: 85, stdDev: 3.2 },
  { ticker: 'MSFT', avgPercentile: 80, stdDev: 2.8 },
  { ticker: 'AMZN', avgPercentile: 75, stdDev: 3.5 },
];

const scatterDataAllYears = [
  { ticker: 'AAPL', avgPercentile: 88, stdDev: 4.2 },
  { ticker: 'GOOGL', avgPercentile: 83, stdDev: 5.1 },
  { ticker: 'MSFT', avgPercentile: 78, stdDev: 4.8 },
  { ticker: 'AMZN', avgPercentile: 73, stdDev: 5.5 },
];

// Sample data for percentile to revenue multiple conversion
const percentileToRevenueData = [
  { percentile: 95, revenueMultiple: 15.0 },
  { percentile: 90, revenueMultiple: 13.0 },
  { percentile: 85, revenueMultiple: 12.0 },
  { percentile: 80, revenueMultiple: 11.0 },
  { percentile: 75, revenueMultiple: 10.0 },
  { percentile: 70, revenueMultiple: 9.0 },
];

// Sample data for box and whisker plots
const boxPlotDataLTM = [
  { percentile: 95, min: 14.0, q1: 14.5, median: 15.0, q3: 15.5, max: 16.0 },
  { percentile: 90, min: 12.5, q1: 12.8, median: 13.0, q3: 13.2, max: 13.5 },
  { percentile: 85, min: 11.5, q1: 11.8, median: 12.0, q3: 12.2, max: 12.5 },
  { percentile: 80, min: 10.5, q1: 10.8, median: 11.0, q3: 11.2, max: 11.5 },
  { percentile: 75, min: 9.5, q1: 9.8, median: 10.0, q3: 10.2, max: 10.5 },
];

const boxPlotDataAllYears = [
  { percentile: 95, min: 13.0, q1: 13.5, median: 14.0, q3: 14.5, max: 15.0 },
  { percentile: 90, min: 11.5, q1: 12.0, median: 12.5, q3: 13.0, max: 13.5 },
  { percentile: 85, min: 10.5, q1: 11.0, median: 11.5, q3: 12.0, max: 12.5 },
  { percentile: 80, min: 9.5, q1: 10.0, median: 10.5, q3: 11.0, max: 11.5 },
  { percentile: 75, min: 8.5, q1: 9.0, median: 9.5, q3: 10.0, max: 10.5 },
];

// Type for time series data
type TimeSeriesData = {
  [key: string]: Array<{
    date: string;
    percentile: number;
    avg: number;
  }>;
};

const timeSeriesData: TimeSeriesData = {
  AAPL: [
    { date: '2023-01', percentile: 88, avg: 85 },
    { date: '2023-02', percentile: 89, avg: 85 },
    { date: '2023-03', percentile: 90, avg: 85 },
    { date: '2023-04', percentile: 91, avg: 85 },
    { date: '2023-05', percentile: 92, avg: 85 },
  ],
  GOOGL: [
    { date: '2023-01', percentile: 83, avg: 80 },
    { date: '2023-02', percentile: 84, avg: 80 },
    { date: '2023-03', percentile: 85, avg: 80 },
    { date: '2023-04', percentile: 86, avg: 80 },
    { date: '2023-05', percentile: 87, avg: 80 },
  ],
};

const getColorForPercentile = (percentile: number) => {
  if (percentile >= 85) return 'success.main';
  if (percentile >= 75) return 'warning.main';
  return 'error.main';
};

export default function PercentileCheck() {
  const [selectedCompany, setSelectedCompany] = useState<keyof typeof timeSeriesData>('AAPL');
  const [editablePercentiles, setEditablePercentiles] = useState<Record<string, number>>({});

  const handlePercentileChange = (ticker: string, value: number) => {
    setEditablePercentiles(prev => ({
      ...prev,
      [ticker]: value
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* First Row - Percentile Output and Editable Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Portfolio Company Rankings (2030)
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Ticker</TableCell>
                      <TableCell>2030 Percentile</TableCell>
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
                          <TextField
                            type="number"
                            value={editablePercentiles[row.ticker] ?? row.percentile2030}
                            onChange={(e) => handlePercentileChange(row.ticker, Number(e.target.value))}
                            size="small"
                            InputProps={{
                              endAdornment: <InputAdornment position="end">th</InputAdornment>,
                            }}
                          />
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

        {/* Second Row - Three Columns */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Latest Percentiles Table */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Latest Percentiles
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Ticker</TableCell>
                          <TableCell>Latest Percentile</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {latestPercentiles.map((row) => (
                          <TableRow key={row.ticker}>
                            <TableCell>{row.ticker}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={row.latestPercentile}
                                    sx={{
                                      height: 10,
                                      borderRadius: 5,
                                      bgcolor: 'grey.200',
                                      '& .MuiLinearProgress-bar': {
                                        bgcolor: getColorForPercentile(row.latestPercentile),
                                      },
                                    }}
                                  />
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                  {row.latestPercentile}th
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* LTM Scatter Plot */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Last 12 Months
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid />
                        <XAxis
                          type="number"
                          dataKey="stdDev"
                          name="Standard Deviation"
                          label={{ value: 'Standard Deviation', position: 'bottom', offset: 0 }}
                          domain={[0, 6]}
                        />
                        <YAxis
                          type="number"
                          dataKey="avgPercentile"
                          name="Average Percentile"
                          label={{ value: 'Average Percentile', angle: -90, position: 'left' }}
                          domain={[70, 100]}
                        />
                        <Tooltip />
                        <ReferenceArea
                          x1={0}
                          x2={3}
                          y1={85}
                          y2={100}
                          fill="success.light"
                          fillOpacity={0.1}
                        />
                        <Scatter
                          data={scatterDataLTM}
                          fill="#8884d8"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* All Years Scatter Plot */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    All Years
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid />
                        <XAxis
                          type="number"
                          dataKey="stdDev"
                          name="Standard Deviation"
                          label={{ value: 'Standard Deviation', position: 'bottom', offset: 0 }}
                          domain={[0, 6]}
                        />
                        <YAxis
                          type="number"
                          dataKey="avgPercentile"
                          name="Average Percentile"
                          label={{ value: 'Average Percentile', angle: -90, position: 'left' }}
                          domain={[70, 100]}
                        />
                        <Tooltip />
                        <ReferenceArea
                          x1={0}
                          x2={3}
                          y1={85}
                          y2={100}
                          fill="success.light"
                          fillOpacity={0.1}
                        />
                        <Scatter
                          data={scatterDataAllYears}
                          fill="#8884d8"
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Third Row - Percentile to Revenue Multiple */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Conversion Table */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Percentile to Revenue Multiple
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Percentile</TableCell>
                          <TableCell>Revenue Multiple</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {percentileToRevenueData.map((row) => (
                          <TableRow key={row.percentile}>
                            <TableCell>{row.percentile}th</TableCell>
                            <TableCell>{row.revenueMultiple}x</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* LTM Box Plot */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    LTM Revenue Multiple Distribution
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={boxPlotDataLTM}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid />
                        <XAxis 
                          dataKey="percentile" 
                          label={{ value: 'Percentile', position: 'bottom', offset: 0 }}
                        />
                        <YAxis 
                          label={{ value: 'Revenue Multiple', angle: -90, position: 'left' }}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="median"
                          name="Median"
                          stroke="#8884d8"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="q1"
                          name="Q1"
                          stroke="#82ca9d"
                          strokeDasharray="3 3"
                        />
                        <Line
                          type="monotone"
                          dataKey="q3"
                          name="Q3"
                          stroke="#82ca9d"
                          strokeDasharray="3 3"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* All Years Box Plot */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    All Years Revenue Multiple Distribution
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={boxPlotDataAllYears}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid />
                        <XAxis 
                          dataKey="percentile" 
                          label={{ value: 'Percentile', position: 'bottom', offset: 0 }}
                        />
                        <YAxis 
                          label={{ value: 'Revenue Multiple', angle: -90, position: 'left' }}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="median"
                          name="Median"
                          stroke="#8884d8"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="q1"
                          name="Q1"
                          stroke="#82ca9d"
                          strokeDasharray="3 3"
                        />
                        <Line
                          type="monotone"
                          dataKey="q3"
                          name="Q3"
                          stroke="#82ca9d"
                          strokeDasharray="3 3"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Fourth Row - Time Series */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Percentile Trend
                </Typography>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Company</InputLabel>
                  <Select
                    value={selectedCompany}
                    label="Company"
                    onChange={(e) => setSelectedCompany(e.target.value as keyof typeof timeSeriesData)}
                  >
                    {Object.keys(timeSeriesData).map((company) => (
                      <MenuItem key={company} value={company}>
                        {company}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeSeriesData[selectedCompany]}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid />
                    <XAxis 
                      dataKey="date" 
                      label={{ value: 'Date', position: 'bottom', offset: 0 }}
                    />
                    <YAxis 
                      domain={[70, 100]}
                      label={{ value: 'Percentile', angle: -90, position: 'left' }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="percentile"
                      name="Current Percentile"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="avg"
                      name="Average Percentile"
                      stroke="#82ca9d"
                      strokeDasharray="3 3"
                    />
                    <ReferenceLine
                      y={timeSeriesData[selectedCompany][0].avg}
                      stroke="#82ca9d"
                      strokeDasharray="3 3"
                      label="Average"
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