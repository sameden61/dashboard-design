import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Sample data for tickers
const tickers = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];

// Sample data for each ticker
const tickerData = {
  AAPL: [
    { year: 2020, volume: 1000000, percent: 25, check: true, caseStudy: 'Case A', financing: 'Series A', ebitda: 500000, fcf: 400000 },
    { year: 2021, volume: 1200000, percent: 30, check: true, caseStudy: 'Case B', financing: 'Series B', ebitda: 600000, fcf: 500000 },
  ],
  GOOGL: [
    { year: 2020, volume: 800000, percent: 20, check: true, caseStudy: 'Case C', financing: 'Series A', ebitda: 400000, fcf: 300000 },
    { year: 2021, volume: 1000000, percent: 25, check: false, caseStudy: 'Case D', financing: 'Series B', ebitda: 500000, fcf: 400000 },
  ],
};

export default function MultiplesSummary() {
  const [selectedTickers, setSelectedTickers] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(new Date('2020-01-01'));
  const [endDate, setEndDate] = useState<Date | null>(new Date('2021-12-31'));

  const handleTickerChange = (event: any) => {
    setSelectedTickers(event.target.value);
  };

  const handleAddRow = (ticker: string) => {
    // In a real application, this would add a new row to the data
    console.log('Adding row for', ticker);
  };

  const handleDeleteRow = (ticker: string, year: number) => {
    // In a real application, this would delete the row from the data
    console.log('Deleting row for', ticker, year);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Ticker</InputLabel>
                <Select
                  multiple
                  value={selectedTickers}
                  onChange={handleTickerChange}
                  renderValue={(selected) => (selected as string[]).join(', ')}
                >
                  {tickers.map((ticker) => (
                    <MenuItem key={ticker} value={ticker}>
                      {ticker}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {tickers.map((ticker) => (
        <Accordion key={ticker}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{ticker}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Year</TableCell>
                    <TableCell>Volume</TableCell>
                    <TableCell>Percent</TableCell>
                    <TableCell>Check</TableCell>
                    <TableCell>Case Study</TableCell>
                    <TableCell>Financing</TableCell>
                    <TableCell>EBITDA</TableCell>
                    <TableCell>FCF</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickerData[ticker as keyof typeof tickerData]?.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell>{row.year}</TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          value={row.volume}
                          onChange={() => {}}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          value={row.percent}
                          onChange={() => {}}
                        />
                      </TableCell>
                      <TableCell>
                        <input type="checkbox" checked={row.check} onChange={() => {}} />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.caseStudy}
                          onChange={() => {}}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          value={row.financing}
                          onChange={() => {}}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          value={row.ebitda}
                          onChange={() => {}}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="number"
                          value={row.fcf}
                          onChange={() => {}}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteRow(ticker, row.year)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                color="primary"
                onClick={() => handleAddRow(ticker)}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
} 