import { Box, Button, Card, CardActions, CardContent } from "@mui/material";
import { useState } from "react";
import { fetchCSVFromS3 } from "./fetchCSVFromS3";
import BarChartFromJSON from "./BarChart";
import PatientBarChart from "./PatientData";
import ScatterPlot from "./ScatterPlot";
import HistogramChart from "./HistogramChart";
import PolarPlot from "./PolarPlot";

export default function Dashboard(props) {
    const [barData, setBarData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [scatterData, setScatterData] = useState([]);
    const [polarData, setPolarData] = useState([]);




    const handleBarChartData = async () => {
        const data = await fetchCSVFromS3('advancedbmrunu', 'output3/bar_chart_data/part-00000-ac92951d-aa0a-454f-b86d-0283fab7e38d-c000.csv');
        console.log("data from S3", data);
        setBarData(data);

    };

    const handlePatientData = async () => {
        const data = await fetchCSVFromS3('advancedbmrunu', 'output3/patient_bar/part-00000-267cf1d8-8f1b-474b-8bb1-ea46aad5b68b-c000.csv');
        console.log("patient data from S3", data);
        setPatientData(data);

    };

    const handleScatterData = async () => {
        const data = await fetchCSVFromS3('advancedbmrunu', 'output3/chart_data/part-00000-985bd610-4217-4b79-acc9-0e3b6eb7b746-c000.csv');
        console.log("patient data from S3", data);
        setScatterData(data);

    };

    const handlePolar = async () => {
        const data = await fetchCSVFromS3('advancedbmrunu', 'output3/chart_data/part-00000-985bd610-4217-4b79-acc9-0e3b6eb7b746-c000.csv');
        console.log("patient data from S3", data);
        setPolarData(data);

    };

    
    return (
        <div>
            <Box padding="40px 40px" display="flex" flexDirection="column">
                <Box display="flex" justifyContent="center">
                    <Card sx={{ maxWidth: 700, maxHeight: 700 }}>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button onClick={handlePatientData} variant="contained">Patient data analysis</Button>
                        </CardActions>
                        <CardContent>
                            {patientData && <PatientBarChart data={patientData} chartId="PatientData" />}
                        </CardContent>

                    </Card>
                </Box>
                <Box padding="50px 40px" display="flex" justifyContent="space-between" >
                    <Card sx={{ maxWidth: 450, maxHeight: 500 }}>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button onClick={handleBarChartData} variant="contained">Get bar chart</Button>
                        </CardActions>
                        <CardContent>
                            {barData && <BarChartFromJSON data={barData} chartId="barChart" />}
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 450, maxHeight: 500 }}>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button onClick={handleScatterData} variant="contained">Get Scatter plot</Button>
                        </CardActions>
                        <CardContent>
                            {scatterData && <ScatterPlot data={scatterData.slice(0, 1000)} chartId="scatterPlot" />}
                        </CardContent>
                    </Card>
                    <Card sx={{ maxWidth: 450, maxHeight: 500 }}>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button onClick={handlePolar} variant="contained">Get Histogram chart</Button>
                        </CardActions>
                        <CardContent>
                            {polarData && <PolarPlot data={polarData.slice(0, 20)} chartId="polarChart" />}
                        </CardContent>
                    </Card>
                </Box>

            </Box>
        </div>
    )
}