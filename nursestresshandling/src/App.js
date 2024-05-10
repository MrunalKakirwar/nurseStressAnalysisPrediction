import { useState } from 'react';
import './App.css';
import { AppBar, Box, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import MedicationIcon from '@mui/icons-material/Medication';
import Dashboard from './components/Dashboard';
import Predictions from './components/Predictions';

function App() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
 
  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <MedicationIcon /> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Nurse Stress Data Analysis and Predictions
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={currentTabIndex} onChange={handleTabChange} indicatorColor='secondary' centered variant='fullWidth'>
        <Tab label='Dashboard' />
        <Tab label='Predictions' />
      </Tabs>
        {currentTabIndex === 0 && <Dashboard/>}
        {currentTabIndex === 1 && <Predictions/>}
      </Box>
    </div>
  );
}

export default App;
