import React from 'react'
import { Box, Stack } from '@mui/material'
import Header from './Header';
import Footer from './Footer';
import Message from './Message';

const Conversation = () => {

    return (
        <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
            {/* Chat Header */}
            <Header />
            {/* Chat Header end */}
            {/* Msg */}
            <Box width={"100%"} sx={{ flexGrow: 1, height: "100%", overflowY: "scroll" }}>
                <Message menu={true} />
            </Box>
            {/* Msg end */}
            {/* Chat Footer */}
            <Footer />
            {/* Chat Footer end */}
        </Stack>
    )
}

export default Conversation