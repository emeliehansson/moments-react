import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import appStyles from '../App.module.css';
import { axiosReq } from '../api/axiosDefaults';
import { useCurrentUser } from '../contexts/CurrentUserContext';

const PopularProfiles = () => {
    const [profileData, setProfileData] = useState({
        // We will use the pageProfile later!
        pageProfile: {results: []},
        PopularProfiles: { results: [] },
    });
    const { PopularProfiles } = profileData;
    const currentUser = useCurrentUser();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(
                    '/profiles/?ordering=-followers_count'
                );
                setProfileData(prevState => ({
                    ...prevState,
                    PopularProfiles: data,
                }));
            } catch(err){
                console.log(err)
            }
        };

        handleMount()
    }, [currentUser]);

    return (
        <Container className={appStyles.Content}>
            <p>Most followed profiles</p>
            {PopularProfiles.results.map(profile => (
                <p key={profile.id}>{profile.owner}</p>
            ))}
        </Container>
    );
}

export default PopularProfiles