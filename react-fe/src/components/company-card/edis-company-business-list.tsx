import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GETBusinessModels, GETCompanyByID, POSTCompanyBusinessModels } from '../../apis/company';
import Checkbox from '@mui/material/Checkbox';

interface Props {
    company: any
}

const BusinessModels = ({company}: any) => {   
    
    const [businessModels, setBusinessModels] = useState<any[]>([])
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [allBusinessModels, setAllBusinessModels] = useState<any[]>([])

    const saveCompanyBusinessModelUpdates = () => {
        if (!company) return;

        const selectedBusinessModels = allBusinessModels.filter((bm) => bm.isSelected).map((bm) => bm.id)

        POSTCompanyBusinessModels(company.id, selectedBusinessModels)
        .then((resp) => {
            setBusinessModels(resp.data)
            setIsEditMode(false)
        })
        .catch(err => {
            console.log(err)
        })

    }


    useEffect(() => {
        if(!company) return;

        GETCompanyByID(company.id)
        .then((resp) => {
            console.log('industries', resp.data.industries)
            setBusinessModels(resp.data.business_models)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {

        if (!isEditMode) return;

        GETBusinessModels()
        .then((resp: any) => {
            setAllBusinessModels(resp.data.map((bm:any) => {
                const isSelected = businessModels.find(selected_bm => selected_bm.id == bm.id)
                bm.isSelected = isSelected ? true : false
                return bm
            }))

        })
        .catch((err) => {
            console.log(err)
        })

    }, [isEditMode])

    if (isEditMode) {

        const handleToggle = (industry_id: any) => {
            setAllBusinessModels(allBusinessModels.map((bm) => {
                if (bm.id == industry_id) bm.isSelected = !bm.isSelected
                return bm
            }))
        }

        return (
            <Box>
                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                        allBusinessModels.map((bm) => (
                            <Box width="50%" py={2}>
                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                        <Checkbox checked={bm.isSelected} onChange={() => handleToggle(bm.id)}/>
                                        <Typography>{bm.name}</Typography>
                                    </Box>
                            </Box>
                        ))
                    }
                </Box>
                <Button onClick={saveCompanyBusinessModelUpdates}>Save Changes</Button>
                <Button onClick={() => setIsEditMode(!isEditMode)}>Cancel</Button>
            </Box>
        )

    }

    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>
                <Typography mt={2} sx={{fontSize: 20, fontWeight: 'bold'}}>Business Models</Typography>
                <Button variant="contained" onClick={() => setIsEditMode(!isEditMode)}>Edit Business Models</Button>
            </Box>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                {
                    businessModels?.map((bm: any) => (
                        <Box
                        sx={{backgroundColor: `#99999960`, 
                        border: 1,
                        borderColor: '#999999',
                        borderRadius: 2, 
                        }}
                        mr={1}
                        px={2}
                        mt={1}
                        >
                            <Typography>{bm.name}</Typography>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}

export default BusinessModels