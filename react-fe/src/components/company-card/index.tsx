import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { INDUSTRY_TAG_COLOR } from '../../utils/color_maps';
import EditIndustriesSection from './edit-industries-section';
import BusinessModels from './edis-company-business-list';

interface Props {
    company: any
}


const CompanyCard = ({company}: Props) => {

    const imgURL: string = company?.logo_url || 'https://static.vecteezy.com/system/resources/previews/008/326/114/non_2x/real-estate-building-logo-icon-design-free-vector.jpg'


    return (
        <Card sx={{minWidth: 300, minHeight: 500}}>
            <CardContent>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                    <img src={`${imgURL}`} width="150" height="150"/>
                    <Box ml={3}>
                        <Typography sx={{fontSize: 24, fontWeight: 'bold'}}>{company?.name}</Typography>
                        <Typography sx={{fontSize: 20}} color="text.secondary">{company?.city}, {company?.country}</Typography>
                    </Box>
                </Box>
                <Box mt={5}>
                <EditIndustriesSection key={`industries-section-${company?.id || 'no-company'}`} company={company} />
                <Box sx={{mt: 3}}>
                    <BusinessModels key={`business-model-section-${company?.id || 'no-company'}`} company={company} />
                </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CompanyCard
