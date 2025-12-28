import React from "react";
import ProfileTabs from "@/components/ui/HomePage/Profile/ProfileTabs";
import { Box, Container } from "@mui/material";


const ProfilePage = () => {
    return (
        <Container>
            <Box sx={{
                my: 12
            }}>
                <ProfileTabs />
            </Box>
        </Container>
    );
};

export default ProfilePage;