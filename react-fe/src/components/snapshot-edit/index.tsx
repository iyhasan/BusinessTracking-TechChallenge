import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GETLatestMetric, GETSnapshotByID, POSTMetricSnapshot, PUTMetricSnapshot } from '../../apis/metric';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import MetricEntriesList from '../metric-entries-list';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';

interface Props {
    metric_snapshot_id?: string,
    company: any,
    title?: string
    handleUpdate?: (item: any) => void
}

const MetricSnapshotCard = ({metric_snapshot_id, company, title, handleUpdate = (item: any) => {}}: Props) => {

    const [metric, setMetric] = useState<any>()

    const [openSnack, setOpenSnack] = useState<boolean>(false)
    const [snackMessage, setSnackMessage] = useState<string>('')

    const triggerSnack = (message: string) => {
        setSnackMessage(message)
        setOpenSnack(true)
    }

    const handleSnackClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnack(false);
    };

    const snackAction = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

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

        if (!metric_snapshot_id) {
            GETLatestMetric(company.id)
            .then((resp) => {
                const { data } = resp
                setMetric(data)
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            GETSnapshotByID(metric_snapshot_id)
            .then((resp) => {
                const { data } = resp
                setMetric(data)
            })
            .catch((err) => {
                console.log(err)
            })
        }

    }, [])

    return (
        <Card sx={{minHeight: 275}}>
            {
                metric ? 
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, px: 5, pb: 3}}>
                    <Box sx={{mb: 3, width: '100%'}}>
                    <Typography sx={{fontSize: 18, fontWeight: 'bold'}}>{title}</Typography>
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
                            triggerSnack('Updated Snapshot')
                            handleUpdate({...metric})
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }}
                    >
                        Update Record
                    </Button>
                    <Box sx={{mt: 3, width: '100%'}}>
                        <MetricEntriesList snapshot_id={metric.id} />
                    </Box>
                </Box>
                : 
                renderEmpty()
            }
            <Snackbar
            open={openSnack}
            autoHideDuration={3000}
            onClose={handleSnackClose}
            message={snackMessage}
            action={snackAction}
            />
        </Card>
    )


}

export default MetricSnapshotCard