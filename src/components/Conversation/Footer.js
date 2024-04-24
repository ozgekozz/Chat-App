import React, { useEffect, useRef, useState } from 'react'
import { Box, Fab, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { LinkSimple, PaperPlaneTilt, Smiley, Camera, File, Image, Sticker, User } from 'phosphor-react'

import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"

const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px",
        paddingBottoö: "12px"
    }
}));

const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Media",
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Camera",
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact",
    },

];

const ChatInput = ({ setOpenPicker }) => {

    const [openActions, setOpenActions] = React.useState(false);
    const iconRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (iconRef.current && !iconRef.current.contains(event.target)) {
                setOpenActions(false);
                setOpenPicker(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [iconRef])

    return (
        <StyledInput
            fullWidth
            placeholder="Write a message..."
            variant="filled"
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <Stack sx={{ width: "max-content" }}>
                        <Stack sx={{ position: "relative", display: openActions ? "inline-block" : "none" }}>
                            {Actions.map((el) => (
                                <Tooltip placement="right" title={el.title}>
                                    <Fab sx={{ position: "absolute", top: -el.y, backgroundColor: el.color }}>
                                        {el.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>
                        <InputAdornment>
                            <IconButton ref={iconRef} onClick = {() => {
                                setOpenActions((prev) => !prev);
                            }}>
                                <LinkSimple />
                            </IconButton>
                        </InputAdornment>
                    </Stack>
                ),
                endAdornment:
                    <InputAdornment>
                        <IconButton ref={iconRef} onClick = {() => {
                            setOpenPicker((prev) => !prev);
                        }}>
                            <Smiley />
                        </IconButton>
                    </InputAdornment>,
            }}
        />
    )
};

const Footer = () => {

    const theme = useTheme();
    const [openPicker, setOpenPicker] = React.useState(false);

    return (
        <Box
            p={2}
            sx={{
                height: 100,
                width: "100%",
                backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.default,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
        >
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <Stack sx={{ width: "100%" }}>
                    {/* Chat Input */}
                    <Box
                        sx={{
                            display: openPicker ? "inline" : "none",
                            zIndex: 10,
                            position: "fixed",
                            bottom: 81,
                            right: 100
                        }}
                    >
                        <Picker
                            theme={theme.palette.mode}
                            data={data}
                            onEmojiSelect={console.log}
                        />
                    </Box>
                    <ChatInput setOpenPicker={setOpenPicker} />
                    {/* Chat Input end */}
                </Stack>
                <Box sx={{ height: 48, width: 48, backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                    <Stack sx={{ height: "100%", width: "100%" }} alignItems={"center"} justifyContent={"center"}>
                        <IconButton>
                            <PaperPlaneTilt color="#fff" />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Footer