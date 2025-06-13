import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import MarketMultiple from './components/MarketMultiple';
import MultiplesSummary from './components/MultiplesSummary';
import PercentileCheck from './components/PercentileCheck';
import ValuationSensitivity from './components/ValuationSensitivity';
import Benchmarks from './components/Benchmarks';
import Values from './components/Values';
import CurrentMetrics from './components/CurrentMetrics';
import CaseStudies from './components/CaseStudies';
import ConsensusValues from './components/ConsensusValues';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/market-multiple" element={<MarketMultiple />} />
            <Route path="/multiples-summary" element={<MultiplesSummary />} />
            <Route path="/percentile-check" element={<PercentileCheck />} />
            <Route path="/valuation-sensitivity" element={<ValuationSensitivity />} />
            <Route path="/benchmarks" element={<Benchmarks />} />
            <Route path="/values" element={<Values />} />
            <Route path="/current-metrics" element={<CurrentMetrics />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/consensus-values" element={<ConsensusValues />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
} 