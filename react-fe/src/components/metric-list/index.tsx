import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GETLatestMetric, GETMetricsForCompany, POSTMetricSnapshot, PUTMetricSnapshot } from '../../apis/metric';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MetricSnapshotCard from '../snapshot-edit';


interface Props {
    company?: any,
    excludeLatest?: boolean
}

const MetricsList = ({company, excludeLatest}: Props) => {

    const [metrics, setMetrics] = useState<any[]>([])

    useEffect(() => {
        if (!company) return;

        GETMetricsForCompany(company.id)
        .then((resp) => {

            const data = resp.data
            if (excludeLatest) data.shift()

            setMetrics([...data])
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const handleUpdate = (updatedMetric: any) => {
        setMetrics(
            metrics.map((m) => {
                if (m.id == updatedMetric.id) return updatedMetric
                else return m
            })
        )
    }

    return (
        <Card>
            {
                metrics.map((snapshot) => (
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>{snapshot.entry_date}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <MetricSnapshotCard metric_snapshot_id={snapshot.id} company={company} handleUpdate={handleUpdate}/>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </Card>
    )
}

export default MetricsList