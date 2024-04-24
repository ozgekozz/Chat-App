import React from 'react'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Slide, Stack, Typography } from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { MagnifyingGlass, XCircle } from 'phosphor-react';
import { CallElement } from '../../components/CallElement';
import { StartCall } from '../../data';

// TODO => Create a reusable comp
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CreateCall = ({ open, handleClose }) => {
    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            sx={{ p: 4 }}
            onClose={handleClose}
        >
            {/* Title */}
            <DialogTitle sx={{ mb: 1 }}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant="h6">Start Call</Typography>
                    <IconButton onClick={handleClose}>
                        <XCircle />
                    </IconButton>
                </Stack>
            </DialogTitle>
            {/* Content */}
            <DialogContent>
                <Stack spacing={2}>
                    <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color='#709CE6' />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder='Search...'
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    </Stack>
                    {/* Call List */}
                    {StartCall.map((el) => <CallElement {...el} />)}
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCall