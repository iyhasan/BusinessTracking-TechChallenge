import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import './index.css'
import { GETCompanies, GETCompanyByID } from '../../apis/company';
import Table from '../../components/table/basic-table';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CompanyCard from '../../components/company-card';
import LatestMetricCard from '../../components/latest-metric-card';

const CompanyDetail: React.FC = () => {
    
    const { id } = useParams()
    const [company, setCompany] = useState<any>()

    useEffect(() => {

        if(!id) return;

        GETCompanyByID(id)
        .then((resp) => {
            const { data } = resp;
            setCompany(data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <Layout>
            <Box sx={{flexGrow: 1}} px={5} pt={2}>
                <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={6}>
                        <Box>
                        <CompanyCard company={company} />
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                        <LatestMetricCard key={company ? `latest-metric-${company.id}` : 'latest-metric-no-company'} company={company}/>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )

}

export default CompanyDetail