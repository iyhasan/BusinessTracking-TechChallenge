import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { INDUSTRY_TAG_COLOR } from '../../utils/color_maps';

interface Props {
    company: any
}

const IndustiesTags = ({industries}: any) => {

    const industriesMap: any = {}

    // group industries by main
    industries?.forEach((industry: any) => {
        if (industriesMap[industry.main_industry]) {
            industriesMap[industry.main_industry].push(industry.name)
        } else {
            industriesMap[industry.main_industry] = [industry.name]
        }
    })

    if (Object.keys(industriesMap).length == 0) {
        return <Typography>No industries linked to company</Typography>
    }

    return (
        <Box sx={{display: 'flex'}}>
            {
                Object.entries(industriesMap).map(([main, subList]: any) => (
                    <Box key={`industry-tag-main-${main}`} sx={{
                        backgroundColor: `${(INDUSTRY_TAG_COLOR as any)[main]}60`, 
                        border: 1,
                        borderColor: (INDUSTRY_TAG_COLOR as any)[main],
                        borderRadius: 2, 
                        }}
                        mr={1}
                        px={2}>
                        <Typography sx={{fontWeight: 'bold'}}>{main}</Typography>
                        {subList.map((industry: string) => (
                            <Box>
                                <Typography ml={2}>{industry}</Typography>
                            </Box>
                        ))}
                    </Box>
                ))
            }
        </Box>
    )

}

const CompanyCard = ({company}: Props) => {

    const imgURL: string = company?.logo_url || 'https://static.vecteezy.com/system/resources/previews/008/326/114/non_2x/real-estate-building-logo-icon-design-free-vector.jpg'


    return (
        <Card sx={{minWidth: 300, minHeight: 500}}>
            <CardContent>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                    <img src={`${imgURL}`} width="150" height="150"/>
                    <Box>
                        <Typography sx={{fontSize: 24, fontWeight: 'bold'}}>{company?.name}</Typography>
                        <Typography sx={{fontSize: 20}} color="text.secondary">{company?.city}, {company?.country}</Typography>
                    </Box>
                </Box>
                <Box mt={5}>
                <IndustiesTags industries={company?.industries} />
                </Box>
            </CardContent>
        </Card>
    )
}

export default CompanyCard
