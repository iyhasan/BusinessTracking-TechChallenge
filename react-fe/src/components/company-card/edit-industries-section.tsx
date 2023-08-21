import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { INDUSTRY_TAG_COLOR } from '../../utils/color_maps';
import { GETCompanyByID, GETIndustries, POSTCompanyIndustries } from '../../apis/company';
import Checkbox from '@mui/material/Checkbox';


interface Props {
    company: any
}

const EditIndustriesSection = ({company}: Props) => {

    const [isEditMode, setIsEditMode] = useState(false)
    const [industries, setIndustries] = useState<any[]>([])
    const [allIndustries, setAllIndustries] = useState<any[]>([])
    const [allMain, setAllMain] = useState<any[]>([])

    const saveCompanyIndustryUpdates = () => {

        if (!company) return;

        const selectedIndustries = allIndustries.filter((i) => i.isSelected).map((i) => i.id)

        POSTCompanyIndustries(company.id, selectedIndustries)
        .then((resp) => {
            setIndustries(resp.data)
            setIsEditMode(false)
        })
        .catch((err) => {
            console.log(err)
        })


    }

    useEffect(() => {
        if(!company) return;

        GETCompanyByID(company.id)
        .then((resp) => {
            setIndustries(resp.data.industries)
        })
        .catch((err) => {
            console.log(err)
        })

    }, [])

    useEffect(() => {

        if (!isEditMode) return;

        GETIndustries()
        .then((resp) => {

            setAllIndustries(resp.data.map((industry: any) => {
                const isSelected = industries.find((selectedInd) => selectedInd.id == industry.id)
                industry.isSelected = isSelected ? true : false
                return industry
            }))

            const tmpAllMain: string[] = []

            resp.data.forEach((industry: any) => {
                if (!tmpAllMain.includes(industry.main_industry)) tmpAllMain.push(industry.main_industry)
            })

            setAllMain(tmpAllMain)
        })
        .catch((err) => {
            console.log(err)
        })

    }, [isEditMode])

    const mainIndustries: string[] = []

    industries?.forEach((industry: any) => {
        if (!mainIndustries.includes(industry.main_industry)) mainIndustries.push(industry.main_industry)
    })

    if (isEditMode) {

        const handleToggle = (industry_id: any) => {
            setAllIndustries(allIndustries.map((industry) => {
                if (industry.id == industry_id) industry.isSelected = !industry.isSelected
                return industry
            }))
        }

        return (
            <Box>
                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    {
                        allMain.map((main) => (
                            <Box width="50%" py={2}>
                                <Typography sx={{fontWeight: 'bold'}}>{main}</Typography>
                                {
                                    allIndustries.filter((industry) => industry.main_industry == main).map((industry) => (
                                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                                            <Checkbox checked={industry.isSelected} onChange={() => handleToggle(industry.id)}/>
                                            <Typography>{industry.name}</Typography>
                                        </Box>
                                    ))
                                }
                            </Box>
                        ))
                    }
                </Box>
                <Button onClick={saveCompanyIndustryUpdates}>Save Changes</Button>
                <Button onClick={() => setIsEditMode(!isEditMode)}>Cancel</Button>
            </Box>
        )
    }

    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb:2}}>
                <Typography sx={{fontSize: 20, fontWeight: 'bold'}}>Main Industries</Typography>
                <Button variant="contained" onClick={() => setIsEditMode(!isEditMode)}>Edit Industries</Button>
            </Box>
            <Box sx={{display: 'flex', flexWrap: 'wrap',}}>
                {
                    mainIndustries.map((main) => (
                        <Box key={`industry-tag-main-${main}`} sx={{
                            backgroundColor: `${(INDUSTRY_TAG_COLOR as any)[main]}60`, 
                            border: 1,
                            borderColor: (INDUSTRY_TAG_COLOR as any)[main],
                            borderRadius: 2, 
                            }}
                            mr={1}
                            px={2}
                            mt={1}>
                            <Typography sx={{fontWeight: 'bold'}}>{main}</Typography>
                        </Box>
                    ))
                }
            </Box>
            <Typography mt={2} sx={{fontSize: 18, fontWeight: 'bold'}}>Specific Industries</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',}}>
                {
                    industries?.map((industry: any) => {

                        const main = industry.main_industry

                        return (
                            (
                                <Box key={`industry-tag-main-${main}`} sx={{
                                    backgroundColor: `${(INDUSTRY_TAG_COLOR as any)[main]}60`, 
                                    border: 1,
                                    borderColor: (INDUSTRY_TAG_COLOR as any)[main],
                                    borderRadius: 2, 
                                    }}
                                    mr={1}
                                    px={2}
                                    mt={1}>
                                    <Typography sx={{fontWeight: 'bold'}}>{industry.name}</Typography>
                                </Box>
                            )
                        )
                    })
                }
            </Box>
        </Box>
    )

}

export default EditIndustriesSection