import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  LinearProgress,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

type Company = 'AAPL' | 'GOOGL' | 'MSFT';
type Year = 2020 | 2021 | 2022;
type Metric = 'revenue' | 'ebitda' | 'fcf' | 'opex' | 'dilution' | 'netDebt';

interface CompanyData {
  revenue: number;
  ebitda: number;
  fcf: number;
  opex: number;
  dilution: number;
  netDebt: number;
}

type YearData = Record<Year, CompanyData>;
type CompanyYearData = Record<Company, YearData>;

// Sample data for the table
const initialData: CompanyYearData = {
  AAPL: {
    2020: { revenue: 1000000, ebitda: 500000, fcf: 400000, opex: 800000, dilution: 0, netDebt: -50000 },
    2021: { revenue: 1200000, ebitda: 600000, fcf: 500000, opex: 960000, dilution: 0, netDebt: -60000 },
    2022: { revenue: 1440000, ebitda: 720000, fcf: 600000, opex: 1152000, dilution: 0, netDebt: -72000 },
  },
  GOOGL: {
    2020: { revenue: 1500000, ebitda: 750000, fcf: 600000, opex: 1200000, dilution: 0, netDebt: -75000 },
    2021: { revenue: 1800000, ebitda: 900000, fcf: 750000, opex: 1440000, dilution: 0, netDebt: -90000 },
    2022: { revenue: 2160000, ebitda: 1080000, fcf: 900000, opex: 1728000, dilution: 0, netDebt: -108000 },
  },
  MSFT: {
    2020: { revenue: 1300000, ebitda: 650000, fcf: 520000, opex: 1040000, dilution: 0, netDebt: -65000 },
    2021: { revenue: 1560000, ebitda: 780000, fcf: 650000, opex: 1248000, dilution: 0, netDebt: -78000 },
    2022: { revenue: 1872000, ebitda: 936000, fcf: 780000, opex: 1497600, dilution: 0, netDebt: -93600 },
  },
};

const companies: Company[] = ['AAPL', 'GOOGL', 'MSFT'];
const years: Year[] = [2020, 2021, 2022];
const metrics: { key: Metric; label: string }[] = [
  { key: 'revenue', label: 'Revenue' },
  { key: 'ebitda', label: 'EBITDA' },
  { key: 'fcf', label: 'FCF' },
  { key: 'opex', label: 'OPEX' },
  { key: 'dilution', label: 'Dilution' },
  { key: 'netDebt', label: 'Net Debt' },
];

export default function Values() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      // In a real application, this would process the uploaded file
      console.log('File uploaded');
    }, 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Upload Interface */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              border: '2px dashed #ccc',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
              },
            }}
            onClick={handleUpload}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Drag and drop your file here
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supported formats: CSV, Excel
            </Typography>
            {isUploading && (
              <Box sx={{ width: '100%', mt: 2 }}>
                <LinearProgress />
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Data Tables */}
      {companies.map((company) => (
        <Card key={company} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {company}
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Metric</TableCell>
                    {years.map((year) => (
                      <TableCell key={year} align="right">
                        {year}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {metrics.map((metric) => (
                    <TableRow key={metric.key}>
                      <TableCell component="th" scope="row">
                        {metric.label}
                      </TableCell>
                      {years.map((year) => (
                        <TableCell key={year} align="right">
                          {initialData[company][year][metric.key].toLocaleString()}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
} 