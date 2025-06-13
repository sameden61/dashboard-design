import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
} from '@mui/material';

// Mock data - replace with real data later
const companies = ['Company A', 'Company B', 'Company C'];
const metrics = ['Revenue', 'Gross Profit', 'EBITDA', 'FCF'];

// Type definitions
type ConsensusValues = {
  [company: string]: {
    [metric: string]: string;
  };
};

// Initialize consensus values state
const initialConsensusValues: ConsensusValues = companies.reduce((acc, company) => {
  acc[company] = metrics.reduce((metricAcc, metric) => {
    metricAcc[metric] = '';
    return metricAcc;
  }, {} as { [metric: string]: string });
  return acc;
}, {} as ConsensusValues);

const CurrentMetrics: React.FC = () => {
  const [consensusValues, setConsensusValues] = useState<ConsensusValues>(initialConsensusValues);

  const handleConsensusChange = (company: string, metric: string, value: string) => {
    setConsensusValues(prev => ({
      ...prev,
      [company]: {
        ...prev[company],
        [metric]: value
      }
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Current Metrics
      </Typography>

      {/* CAGR Table */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        CAGR Analysis
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              {metrics.map((metric) => (
                <TableCell key={metric}>{metric} CAGR</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company}>
                <TableCell>{company}</TableCell>
                {metrics.map((metric) => (
                  <TableCell key={`${company}-${metric}`}>--</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* LTM Summary Table */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        LTM Summary
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              {metrics.map((metric) => (
                <TableCell key={metric}>{metric}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company}>
                <TableCell>{company}</TableCell>
                {metrics.map((metric) => (
                  <TableCell key={`${company}-${metric}`}>--</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* NTM Consensus Summary Table */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        NTM Consensus Summary
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              {metrics.map((metric) => (
                <TableCell key={metric}>{metric}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company}>
                <TableCell>{company}</TableCell>
                {metrics.map((metric) => (
                  <TableCell key={`${company}-${metric}`}>--</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Consensus Value Input Table */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Consensus Value Input
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              {metrics.map((metric) => (
                <TableCell key={metric}>{metric}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company}>
                <TableCell>{company}</TableCell>
                {metrics.map((metric) => (
                  <TableCell key={`${company}-${metric}`}>
                    <TextField
                      size="small"
                      value={consensusValues[company][metric]}
                      onChange={(e) => handleConsensusChange(company, metric, e.target.value)}
                      placeholder="Enter value"
                      fullWidth
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CurrentMetrics; 