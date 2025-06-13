import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  CloudUpload as CloudUploadIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

// Sample data for the table
const initialData = [
  {
    year: 2020,
    revenue: 1000000,
    ebitda: 500000,
    fcf: 400000,
    opex: 800000,
    capex: 100000,
  },
  {
    year: 2021,
    revenue: 1200000,
    ebitda: 600000,
    fcf: 500000,
    opex: 960000,
    capex: 120000,
  },
  {
    year: 2022,
    revenue: 1440000,
    ebitda: 720000,
    fcf: 600000,
    opex: 1152000,
    capex: 144000,
  },
];

const companies = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META'];

export default function Values() {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tableData, setTableData] = useState(initialData);
  const [isUploading, setIsUploading] = useState(false);

  const handleCompanyChange = (event: SelectChangeEvent) => {
    setSelectedCompany(event.target.value);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real application, this would save the data to a backend
    console.log('Saving data:', tableData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTableData(initialData);
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      // In a real application, this would process the uploaded file
      console.log('File uploaded');
    }, 2000);
  };

  const handleCellChange = (
    year: number,
    field: keyof typeof initialData[0],
    value: string
  ) => {
    setTableData(
      tableData.map((row) =>
        row.year === year
          ? { ...row, [field]: parseFloat(value) || 0 }
          : row
      )
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Company</InputLabel>
                <Select
                  value={selectedCompany}
                  onChange={handleCompanyChange}
                  label="Company"
                >
                  {companies.map((company) => (
                    <MenuItem key={company} value={company}>
                      {company}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                {isEditing ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  Upload
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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

      {/* Data Table */}
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell>Revenue</TableCell>
                  <TableCell>EBITDA</TableCell>
                  <TableCell>FCF</TableCell>
                  <TableCell>OPEX</TableCell>
                  <TableCell>Capex</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.year}>
                    <TableCell>{row.year}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          type="number"
                          value={row.revenue}
                          onChange={(e) =>
                            handleCellChange(row.year, 'revenue', e.target.value)
                          }
                        />
                      ) : (
                        row.revenue.toLocaleString()
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          type="number"
                          value={row.ebitda}
                          onChange={(e) =>
                            handleCellChange(row.year, 'ebitda', e.target.value)
                          }
                        />
                      ) : (
                        row.ebitda.toLocaleString()
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          type="number"
                          value={row.fcf}
                          onChange={(e) =>
                            handleCellChange(row.year, 'fcf', e.target.value)
                          }
                        />
                      ) : (
                        row.fcf.toLocaleString()
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          type="number"
                          value={row.opex}
                          onChange={(e) =>
                            handleCellChange(row.year, 'opex', e.target.value)
                          }
                        />
                      ) : (
                        row.opex.toLocaleString()
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          size="small"
                          type="number"
                          value={row.capex}
                          onChange={(e) =>
                            handleCellChange(row.year, 'capex', e.target.value)
                          }
                        />
                      ) : (
                        row.capex.toLocaleString()
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
} 