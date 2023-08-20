import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { INDUSTRY_TAG_COLOR } from '../../utils/color_maps';
import { GETLatestMetric, POSTMetricSnapshot, PUTMetricSnapshot } from '../../apis/metric';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
    company?: any,
}

const LatestMetricCard = ({company}: Props) => {

    const [metric, setMetric] = useState<any>()

    const updateField = (key: string, value: any) => {
        console.log(key, value)

        if (key == 'entry_date') metric[key] = value.format('YYYY/MM/DD')
        else metric[key] = value
        setMetric({...metric})
    }

    const renderEmpty = () => {
        return (
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 275}}>
            <Typography mx="auto">No metrics defined yet for company</Typography>
            <Button 
            variant="contained"
            disabled={!company}
            onClick={() => {
                if (!company) return;

                POSTMetricSnapshot(company.id)
                .then((resp) => {
                    setMetric(resp.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            }}
            >
                Add New
            </Button>
        </Box>
        )
    }    
    
    useEffect(() => {

        if (!company) return;

        GETLatestMetric(company.id)
        .then((resp) => {
            const { data } = resp
            setMetric(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <Card sx={{minHeight: 275}}>
            {
                metric ? 
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, px: 5, pb: 3}}>
                    <Box sx={{mb: 3, width: '100%'}}>
                    <Typography sx={{fontSize: 18, fontWeight: 'bold'}}>Latest Snapshot</Typography>
                    <Typography sx={{fontSize: 16}} color="text.secondary">Created by {metric.created_by?.first_name} {metric.created_by?.last_name}</Typography>
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker sx={{marginBottom: 3, width: '100%'}} label='Entry Date' defaultValue={metric?.entry_date ? dayjs(metric.entry_date) : dayjs(new Date())} onChange={(newDate) => updateField('entry_date', newDate)}/>
                        <DesktopDatePicker sx={{marginBottom: 3, width: '100%'}} label='Estimated Next Fundraiser Date' defaultValue={metric?.next_estimated_fundraise_date ? dayjs(metric.next_estimated_fundraise_date) : null} onChange={(newDate) => updateField('next_estimated_fundraise_date', newDate)}/>
                    </LocalizationProvider>
                    <Button 
                    variant="contained"
                    onClick={() => {
                        PUTMetricSnapshot(metric.id, metric)
                        .then((resp) => {

                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }}
                    >
                        Update Record
                    </Button>
                </Box>
                : 
                renderEmpty()
            }
        </Card>
    )
}

export default LatestMetricCard;