import { Box, Button, Card, CardActions, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { fetchCSVFromS3 } from "./fetchCSVFromS3";

export default function Predictions(props) {
    const [testData, setTestData] = useState([]);
    const [trainData, setTrainData] = useState([]);
    const [compar, setCompar] = useState([]);


    const handleTrainingData = async () => {

        const data = await fetchCSVFromS3('advancedbmrunu', 'output_model/train_data/part-00000-32bea10e-a46d-48e1-8e56-ead429ca6cc9-c000.csv');
        console.log("training data from S3", data);
        setTrainData(data);

    };

    const handleTestData = async () => {

        const data = await fetchCSVFromS3('advancedbmrunu', 'output_model/test_data/part-00000-f999763e-f493-492c-b1bf-f7517bcb36a7-c000.csv');
        console.log("training data from S3", data);
        setTestData(data);

    };

    const handleCompare = async () => {

        const data = await fetchCSVFromS3('advancedbmrunu', 'output_model/preds/part-00000-6843bb6c-f6e5-42f0-8421-92bb209a21a4-c000.csv');
        console.log("training data from S3", data);
        setCompar(data);

    };

    return (
        <div>
            <Box padding="40px 40px" display="flex">
                <Box padding="40px">
                    <Card sx={{ maxWidth: 400, maxHeight: 500 }}>
                        <CardActions>
                            <Button onClick={handleTrainingData} variant="contained">Training data</Button>
                        </CardActions>
                        <CardContent>
                            {trainData &&
                                <Box>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    {trainData.length > 0 && Object.keys(trainData[0]).map((key) => <TableCell key={key}>{key}</TableCell>)}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {trainData.slice(0, 10).map((row, index) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        {Object.values(row).map((value, idx) => (
                                                        <TableCell component="th" scope="row" key={idx}>
                                                            {value}
                                                        </TableCell>
                                                        
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>}
                        </CardContent>
                    </Card>
                </Box>

                <Box padding="40px">
                    <Card sx={{ maxWidth: 400, maxHeight: 500 }}>
                        <CardActions>
                            <Button onClick={handleTestData} variant="contained">Test data</Button>
                        </CardActions>
                        <CardContent>
                            {testData &&
                                <Box>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    {testData.length > 0 && Object.keys(testData[0]).map((key) => <TableCell key={key}>{key}</TableCell>)}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {testData.slice(0, 10).map((row, index) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        {Object.values(row).map((value, idx) => (
                                                        <TableCell component="th" scope="row" key={idx}>
                                                            {value}
                                                        </TableCell>
                                                        
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>}
                        </CardContent>
                    </Card>
                </Box>
                <Box padding="40px">
                    <Card sx={{ maxWidth: 400, maxHeight: 500 }}>
                        <CardActions>
                            <Button onClick={handleCompare} variant="contained" centered>Actual vs Predicted</Button>
                        </CardActions>
                        <CardContent>
                            {compar &&
                                <Box>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    {compar.length > 0 && Object.keys(compar[0]).map((key) => <TableCell key={key}>{key}</TableCell>)}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {compar.slice(0, 10).map((row, index) => (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        {Object.values(row).map((value, idx) => (
                                                        <TableCell component="th" scope="row" key={idx}>
                                                            {value}
                                                        </TableCell>
                                                        
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>}
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </div>
    )

}