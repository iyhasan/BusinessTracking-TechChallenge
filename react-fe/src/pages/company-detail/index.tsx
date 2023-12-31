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
import MetricsList from '../../components/metric-list';

const CompanyDetail: React.FC = () => {
    
    const { id } = useParams()
    const [company, setCompany] = useState<any>()
    const [toggleRefresh, setToggleRefresh] = useState<boolean>(false)

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
                        <LatestMetricCard key={company ? `latest-metric-${company.id}-${toggleRefresh}` : 'latest-metric-no-company'} company={company} triggerParentRefresh={() => {
                            setToggleRefresh(!toggleRefresh)
                        }}/>
                        <Box mt={3}>
                            <MetricsList key={company ? `all-metrics-${company.id}-${toggleRefresh}` : 'all-metrics-no-company'} company={company} excludeLatest={true}/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )

}

export default CompanyDetail