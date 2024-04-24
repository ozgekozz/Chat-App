import React, { useState } from 'react'
import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Phone } from 'phosphor-react'
import { useTheme } from '@mui/material/styles'
import { SimpleBarStyle } from '../../components/Scrollbar'
import { CallLogElement } from '../../components/CallElement'
import { CallChatList } from '../../data'
import CreateCall from '../../sections/main/CreateCall'

const Call = () => {

  const theme = useTheme();
  const [openCall, setOpenCall] = useState(false);

  const handleCloseCall = () => {
    setOpenCall(false);
  };

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
        <Box sx={{
          height: "100vh",
          backgroundColor: (theme) => theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
          width: 320,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
        }}>
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack>
              <Typography variant="h4">Call Log</Typography>
            </Stack>
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
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
              <Typography variant="subtitle2" component={Link}>
                Start New Conversation
              </Typography>
              <IconButton onClick={() => {
                setOpenCall(true);
              }}>
                <Phone style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack spacing={3} sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.4}>
                  {/* Call Chat List */}
                  {CallChatList.map((el) => <CallLogElement {...el} />)}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
        {/* Right */}
        {/* // TODO => Reuse Conversation Components */}
      </Stack>
      {openCall && <CreateCall open={openCall} handleClose={handleCloseCall} />}
    </>
  )
}

export default Call