import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import './index.css'
import { GETCompanies } from '../../apis/company';
import Table from '../../components/table/basic-table';
import { useNavigate } from 'react-router-dom';


const CompanyList: React.FC = () => {
    const navigate = useNavigate()

    const [companies, setCompanies] = useState([])

    useEffect(() => {

        GETCompanies()
        .then((resp: any) => {
            const { data } = resp
            setCompanies(data)
        })
        .catch((err) => {
            console.log(err)
        })

    }, [])

    return (
        <Layout>
            <Table 
            columns={[
                {
                    label: 'Name',
                    dataKey: 'name',
                },
                {
                    label: 'City',
                    dataKey: 'city'
                },
                {
                    label: 'Country',
                    dataKey: 'country'
                }
            ]}
            data={companies}
            onRowClick={(id) => navigate(`/company/${id}`)}
            />
        </Layout>
    )
}

export default CompanyList;