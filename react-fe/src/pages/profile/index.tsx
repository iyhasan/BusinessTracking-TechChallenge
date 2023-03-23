import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { ProfileType } from '../../types/user';
import { GETProfile } from '../../apis/user';
import { PROFILE_FIELDS } from './objects';
import './index.css'

const Profile: React.FC = () => {

    const [profile, setProfile] = useState<ProfileType | null>(null);

    // fetch profile info
    useEffect(() => {
        
        GETProfile()
        .then((resp) => {
            const { data } = resp;
            setProfile(data);
        })
        .catch((err) => {
            console.log(err)
        })
        
    }, [])

    return (
    <Layout>
        <div>
        <table className='table'>
            <thead>
                <tr>
                <th className='table-head'>Field</th>
                <th className='table-head'>Value</th>
                </tr>
            </thead>
            <tbody>
                {
                    PROFILE_FIELDS.map((field) => (
                        <tr key={`${field.dataIndex}`}>
                            <td className='field-label'>{field.label}</td>
                            <td className='field-value'>{profile ? profile[field.dataIndex as keyof ProfileType] : null}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    </Layout>
    );
};

export default Profile;