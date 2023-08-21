import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { INDUSTRY_TAG_COLOR } from '../../utils/color_maps';
import EditIndustriesSection from './edit-industries-section';
import { GETBusinessModels, GETCompanyByID, POSTCompanyBusinessModels } from '../../apis/company';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from '@mui/material';

interface CompanyFields {
    name: string,
    city: string,
    country: string,
    linkedin_url: string,
    logo_url: string,
}

const fields = [
    {
        label: 'Name',
        key: 'name',
        required: true,
    },
    {
        label: 'City',
        key: 'city',
        required: true,
    },
    {
        label: 'Country',
        key: 'country',
        required: true,
    },
    {
        label: 'Logo URL',
        key: 'logo_url'
    },
    {
        label: 'Linkedin URL',
        key: 'linkedin_url'
    },
]

interface Props {
    onSubmit: (item: any) => void,
    onCancel: () => void,
}

const AddCompanyCard = (
    {onSubmit, onCancel}: Props
) => {

    const [company, setCompany] = useState<any>({})
    const [err, setErr] = useState<any>({})

    const handleUpdate = (key: string, newValue: string) => {
        err[key] = null
        company[key] = newValue
        setCompany({...company})
        setErr({...err})
    }

    const validate = () => {
        const err: any = {}
        let isValid: boolean = true

        fields.forEach((field) => {
            const value = company[field.key]
            if (field.required) {
                if (!value) {
                    isValid = false
                    err[field.key] = 'Required'
                }
            }
        })

        setErr({...err})

        if (!isValid) return;

        onSubmit(company)
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            {
                fields.map((field) => {
                    const fieldErr = err[field.key]

                    return (
                        <Box mt={1} width="100%">
                            <TextField sx={{ width: '100%'}} error={fieldErr} label={field.label} onChange={(newValue) => handleUpdate(field.key, newValue.target.value)}/>
                            { fieldErr ? <Typography color="red">{fieldErr}</Typography> : null}
                        </Box>
                    )
                })
            }
            <Box mt={3} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <Button variant='contained' onClick={validate}>Submit</Button>
                <Button sx={{mt: 2}} onClick={onCancel}>Cancel</Button>
            </Box>
        </Box>
    )

}

export default AddCompanyCard