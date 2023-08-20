import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import './index.css'
import { GETCompanies } from '../../apis/company';
import Table from '../../components/table/basic-table';


const CompanyList: React.FC = () => {
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
            />
        </Layout>
    )
}

export default CompanyList;