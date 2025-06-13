import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample data for the scatter plot
const scatterData = [
  { x: 5, y: 15, name: 'Company A', sector: 'Tech' },
  { x: 12, y: 8, name: 'Company B', sector: 'Finance' },
  { x: 17.7, y: 12, name: 'Company C', sector: 'Healthcare' },
  { x: 25, y: 18, name: 'Company D', sector: 'Tech' },
  { x: 30, y: 10, name: 'Company E', sector: 'Finance' },
];

// Sample data for the price table
const priceData = [
  { ticker: 'AAPL', currentPrice: 150.25, changeToday: 2.5, change1M: 5.2, change3M: 8.4, change6M: 12.1 },
  { ticker: 'GOOGL', currentPrice: 2800.75, changeToday: -1.2, change1M: 3.1, change3M: 6.2, change6M: 9.8 },
  { ticker: 'MSFT', currentPrice: 280.50, changeToday: 3.1, change1M: 4.5, change3M: 7.8, change6M: 11.2 },
];

// Sample data for the multiples table
const multiplesData = [
  { ticker: 'AAPL', revenueMultiple: 5.2, ebitdaMultiple: 12.4, fcfMultiple: 15.6 },
  { ticker: 'GOOGL', revenueMultiple: 6.8, ebitdaMultiple: 14.2, fcfMultiple: 18.3 },
  { ticker: 'MSFT', revenueMultiple: 7.1, ebitdaMultiple: 15.0, fcfMultiple: 19.2 },
];

// Sample data for the exposure breakdown
const exposureData = [
  { ticker: 'AAPL', positionSize: 1000000, portfolioPercentage: 25, change1M: 2.5, change3M: 4.2, change6M: 6.8 },
  { ticker: 'GOOGL', positionSize: 800000, portfolioPercentage: 20, change1M: -1.2, change3M: 2.1, change6M: 3.5 },
  { ticker: 'MSFT', positionSize: 1200000, portfolioPercentage: 30, change1M: 3.1, change3M: 5.4, change6M: 8.2 },
];

// Sample data for price reference
const priceReferenceData = [
  { ticker: 'AAPL', currentPrice: 150.25, priceAt5: 142.50, priceAt12: 135.75, priceAt17_7: 130.25, priceAt25: 122.50 },
  { ticker: 'GOOGL', currentPrice: 2800.75, priceAt5: 2660.00, priceAt12: 2530.00, priceAt17_7: 2420.00, priceAt25: 2280.00 },
  { ticker: 'MSFT', currentPrice: 280.50, priceAt5: 266.50, priceAt12: 253.75, priceAt17_7: 242.50, priceAt25: 228.00 },
];

// Sample data for IRR projections
const irrProjectionData = [
  { ticker: 'AAPL', exposure: 25, irr2029: 15.2, irr2030: 17.8, irr2031: 20.1 },
  { ticker: 'GOOGL', exposure: 20, irr2029: 12.5, irr2030: 14.3, irr2031: 16.2 },
  { ticker: 'MSFT', exposure: 30, irr2029: 18.3, irr2030: 21.5, irr2031: 24.8 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box sx={{ bgcolor: 'background.paper', p: 1, border: '1px solid #ccc' }}>
        <Typography variant="body2">{`Company: ${data.name}`}</Typography>
        <Typography variant="body2">{`IRR: ${data.x}%`}</Typography>
        <Typography variant="body2">{`Exposure: ${data.y}%`}</Typography>
        <Typography variant="body2">{`Sector: ${data.sector}`}</Typography>
      </Box>
    );
  }
  return null;
};

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = React.useState('2030');

  return (
    <Grid container spacing={3}>
      {/* Row 1 */}
      {/* Exposure vs IRR Chart */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Exposure vs IRR
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="IRR" unit="%" />
                  <YAxis type="number" dataKey="y" name="Exposure" unit="%" domain={[0, 20]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter data={scatterData} fill="#143A38" />
                </ScatterChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* IRR Projection Table */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              IRR Projections
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Ticker</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Exposure</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>IRR 2029</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>IRR 2030</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>IRR 2031</th>
                  </tr>
                </thead>
                <tbody>
                  {irrProjectionData.map((row) => (
                    <tr key={row.ticker}>
                      <td style={{ padding: '8px' }}>{row.ticker}</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>{row.exposure}%</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>{row.irr2029}%</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>{row.irr2030}%</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>{row.irr2031}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Row 2 */}
      {/* Multiples Summary */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Key Multiples</Typography>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  label="Year"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem>
                  <MenuItem value="2027">2027</MenuItem>
                  <MenuItem value="2028">2028</MenuItem>
                  <MenuItem value="2029">2029</MenuItem>
                  <MenuItem value="2030">2030</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Ticker</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Revenue Multiple</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>EBITDA Multiple</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>FCF Multiple</th>
                  </tr>
                </thead>
                <tbody>
                  {multiplesData.map((row) => (
                    <tr key={row.ticker}>
                      <td style={{ padding: '8px' }}>{row.ticker}</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>{row.revenueMultiple.toFixed(1)}x</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>{row.ebitdaMultiple.toFixed(1)}x</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>{row.fcfMultiple.toFixed(1)}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Exposure Breakdown */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Portfolio Exposure
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Ticker</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>% Exposure</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Δ% 1M</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Δ% 3M</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Δ% 6M</th>
                  </tr>
                </thead>
                <tbody>
                  {exposureData
                    .sort((a, b) => b.portfolioPercentage - a.portfolioPercentage)
                    .map((row) => (
                      <tr key={row.ticker}>
                        <td style={{ padding: '8px' }}>{row.ticker}</td>
                        <td style={{ padding: '8px' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              sx={{
                                width: '100%',
                                height: 20,
                                bgcolor: 'grey.200',
                                borderRadius: 1,
                                overflow: 'hidden',
                              }}
                            >
                              <Box
                                sx={{
                                  width: `${row.portfolioPercentage}%`,
                                  height: '100%',
                                  bgcolor: 'primary.main',
                                }}
                              />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ ml: 1, minWidth: 40, textAlign: 'right' }}
                            >
                              {row.portfolioPercentage}%
                            </Typography>
                          </Box>
                        </td>
                        <td style={{ textAlign: 'right', padding: '8px', color: row.change1M >= 0 ? 'green' : 'red' }}>
                          {row.change1M >= 0 ? '+' : ''}{row.change1M}pp
                        </td>
                        <td style={{ textAlign: 'right', padding: '8px', color: row.change3M >= 0 ? 'green' : 'red' }}>
                          {row.change3M >= 0 ? '+' : ''}{row.change3M}pp
                        </td>
                        <td style={{ textAlign: 'right', padding: '8px', color: row.change6M >= 0 ? 'green' : 'red' }}>
                          {row.change6M >= 0 ? '+' : ''}{row.change6M}pp
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Row 3 */}
      {/* Price Table */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Price Tracking
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Ticker</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Current Price</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Change Today</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Δ% 1M</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Δ% 3M</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Δ% 6M</th>
                  </tr>
                </thead>
                <tbody>
                  {priceData.map((row) => (
                    <tr key={row.ticker}>
                      <td style={{ padding: '8px' }}>{row.ticker}</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>${row.currentPrice.toFixed(2)}</td>
                      <td style={{ textAlign: 'right', padding: '8px', color: row.changeToday >= 0 ? 'green' : 'red' }}>
                        {row.changeToday >= 0 ? '+' : ''}{row.changeToday}%
                      </td>
                      <td style={{ textAlign: 'right', padding: '8px', color: row.change1M >= 0 ? 'green' : 'red' }}>
                        {row.change1M >= 0 ? '+' : ''}{row.change1M}%
                      </td>
                      <td style={{ textAlign: 'right', padding: '8px', color: row.change3M >= 0 ? 'green' : 'red' }}>
                        {row.change3M >= 0 ? '+' : ''}{row.change3M}%
                      </td>
                      <td style={{ textAlign: 'right', padding: '8px', color: row.change6M >= 0 ? 'green' : 'red' }}>
                        {row.change6M >= 0 ? '+' : ''}{row.change6M}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Price Reference Table */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Price Reference
            </Typography>
            <Box sx={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Ticker</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Current Price</th>
                    <th colSpan={4} style={{ textAlign: 'center', padding: '8px' }}>
                      Price at given IRR through Jan 1, 2023
                    </th>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px' }}></th>
                    <th style={{ textAlign: 'right', padding: '8px' }}></th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>5%</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>12%</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>17.7%</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>25%</th>
                  </tr>
                </thead>
                <tbody>
                  {priceReferenceData.map((row) => (
                    <tr key={row.ticker}>
                      <td style={{ padding: '8px' }}>{row.ticker}</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>${row.currentPrice.toFixed(2)}</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>${row.priceAt5.toFixed(2)}</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>${row.priceAt12.toFixed(2)}</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>${row.priceAt17_7.toFixed(2)}</td>
                      <td style={{ textAlign: 'right', padding: '8px' }}>${row.priceAt25.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
} 