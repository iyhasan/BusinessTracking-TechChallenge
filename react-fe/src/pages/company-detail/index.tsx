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

const CompanyDetail: React.FC = () => {
    
    const { id } = useParams()
    const [company, setCompany] = useState()

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
            <Box sx={{flexGrow: 1}}>
                <Grid container>
                    <Grid item lg={6} md={6} sm={6}>
                        <Box px={5} pt={2}>
                        <CompanyCard company={company} />
                        </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                        Metrics
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    )

}

export default CompanyDetail