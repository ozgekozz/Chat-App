import { Box, Stack } from '@mui/material'
import React from 'react'
import { Chat_History } from '../../data'
import { DocLine, LinkLine, MediaLine, ReplyLine, TextLine, TimeLine } from './MsgTypes'

const Message = ({menu}) => {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {Chat_History.map((el) => {
                    switch (el.type) {
                        case "divider":
                            // timeline
                            return <TimeLine el={el} />;
                        case "msg":
                            switch (el.subtype) {
                                case "img":
                                    //img msg
                                    return <MediaLine el={el} menu={menu} />;
                                case "doc":
                                    //doc msg
                                    return <DocLine el={el} menu={menu} />;
                                case "link":
                                    //link msg
                                    return <LinkLine el={el} menu={menu} />;
                                case "reply":
                                    //reply msg
                                    return <ReplyLine el={el} menu={menu} />;
                                default:
                                    // text msg
                                    return <TextLine el={el} menu={menu} />;
                            }

                            break;

                        default:
                            return <></>;
                    }
                })}
            </Stack>
        </Box>
    )
}

export default Message