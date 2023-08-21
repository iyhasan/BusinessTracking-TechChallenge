import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { GETCompanies, POSTCompany } from '../../apis/company';
import Table from '../../components/table/basic-table';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import AddCompanyCard from '../../components/company-card/add-company-card';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const Home: React.FC = () => {

  const navigate = useNavigate()

  const [companies, setCompanies] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



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
          <Box sx={{display: 'flex', flexDirection: 'column', px: 3, py: 2}}>
            <Box sx={{ml: 'auto', mb: 2}}>
                <Button variant="contained" onClick={handleOpen}>Add Company</Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={modalStyle}>
                    <AddCompanyCard onSubmit={(newCompany) => {
                        POSTCompany(newCompany)
                        .then((resp) => {
                            const {data} = resp
                            navigate(`/company/${data.id}`)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }}
                    onCancel={handleClose}/>
                </Box>

            </Modal>
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
          </Box>
      </Layout>
  )
};

export default Home;