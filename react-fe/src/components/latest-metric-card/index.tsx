import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GETLatestMetric, POSTMetricSnapshot, PUTMetricSnapshot } from '../../apis/metric';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import MetricEntriesList from '../metric-entries-list';
import MetricSnapshotCard from '../snapshot-edit';


interface Props {
    company?: any,
    triggerParentRefresh ?: () => void
}

const LatestMetricCard = ({company, triggerParentRefresh = () => {}}: Props) => {

    return (
        <Card sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{ml: 'auto', mr: 2, mt: 2}}>
                <Button variant="contained" onClick={() => {
                    if (!company) return;

                    POSTMetricSnapshot(company.id)
                    .then((resp) => {
                        triggerParentRefresh()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }}>New Metric Snapshot</Button>
            </Box>
            <MetricSnapshotCard company={company} title="Latest Snapshot"/>
        </Card>
    )
}

export default LatestMetricCard;