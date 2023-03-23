import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { ProfileType } from '../../types/user';
import { GETProfile } from '../../apis/user';

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
        <table>
            <thead>
                <tr>
                <th>Field</th>
                <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>First Name</td>
                <td>{profile?.first_name}</td>
                </tr>
                <tr>
                <td>Last Name</td>
                <td>{profile?.last_name}</td>
                </tr>
                <tr>
                <td>Email</td>
                <td>{profile?.email}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </Layout>
    );
};

export default Profile;