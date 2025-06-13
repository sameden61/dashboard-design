import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';

// Sample data for tickers
const tickers = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];

// Sample data for each ticker
const tickerData = {
  AAPL: [
    { 
      year: 2020, 
      valModel: '10', 
      percentile: 25, 
      caseStudyValue: 0.85,
      caseStudyId: 'PANW_202005',
      finalMultiple: 8.5,
      ebitdaMultiple: 12.3,
      fcfMultiple: 15.2,
      marketMultiple: 10.1
    },
    { 
      year: 2021, 
      valModel: '10', 
      percentile: 30, 
      caseStudyValue: 0.92,
      caseStudyId: 'PANW_202106',
      finalMultiple: 9.2,
      ebitdaMultiple: 13.1,
      fcfMultiple: 16.0,
      marketMultiple: 11.2
    },
  ],
  GOOGL: [
    { 
      year: 2020, 
      valModel: '10', 
      percentile: 20, 
      caseStudyValue: 0.78,
      caseStudyId: 'PANW_202003',
      finalMultiple: 7.8,
      ebitdaMultiple: 11.5,
      fcfMultiple: 14.3,
      marketMultiple: 9.5
    },
    { 
      year: 2021, 
      valModel: '10', 
      percentile: 25, 
      caseStudyValue: 0.81,
      caseStudyId: 'PANW_202104',
      finalMultiple: 8.1,
      ebitdaMultiple: 12.0,
      fcfMultiple: 14.8,
      marketMultiple: 9.8
    },
  ],
};

export default function MultiplesSummary() {
  const [editedValues, setEditedValues] = useState<Record<string, Record<number, number>>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const handleFinalMultipleChange = (ticker: string, year: number, value: number) => {
    setEditedValues(prev => ({
      ...prev,
      [ticker]: {
        ...prev[ticker],
        [year]: value
      }
    }));
    setHasChanges(true);
  };

  const handleRefresh = () => {
    // Here you would typically make an API call to update the values
    console.log('Refreshing with new values:', editedValues);
    setHasChanges(false);
    setEditedValues({});
  };

  return (
    <Box sx={{ p: 2 }}>
      {hasChanges && (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            size="small"
          >
            Refresh Changes
          </Button>
        </Box>
      )}
      {tickers.map((ticker) => (
        <Box key={ticker} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>{ticker}</Typography>
          <TableContainer component={Paper} sx={{ mb: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell>Val Model</TableCell>
                  <TableCell>Percentile</TableCell>
                  <TableCell>Case Study Value</TableCell>
                  <TableCell>Case Study ID</TableCell>
                  <TableCell>Final Multiple</TableCell>
                  <TableCell sx={{ borderLeft: '2px solid #e0e0e0' }}>EBITDA Multiple</TableCell>
                  <TableCell>FCF Multiple</TableCell>
                  <TableCell sx={{ borderLeft: '2px solid #e0e0e0' }}>Market Multiple</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickerData[ticker as keyof typeof tickerData]?.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>{row.valModel}</TableCell>
                    <TableCell>{row.percentile}</TableCell>
                    <TableCell>{row.caseStudyValue}</TableCell>
                    <TableCell>{row.caseStudyId}</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        type="number"
                        value={editedValues[ticker]?.[row.year] ?? row.finalMultiple}
                        onChange={(e) => handleFinalMultipleChange(ticker, row.year, parseFloat(e.target.value))}
                      />
                    </TableCell>
                    <TableCell sx={{ borderLeft: '2px solid #e0e0e0' }}>
                      {row.ebitdaMultiple}
                    </TableCell>
                    <TableCell>
                      {row.fcfMultiple}
                    </TableCell>
                    <TableCell sx={{ borderLeft: '2px solid #e0e0e0' }}>
                      {row.marketMultiple}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
} 