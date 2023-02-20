/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import {
  MoreVertOutlined, Chat, Search, Logout
} from '@mui/icons-material'
import {
  StyledAvatar, StyledContainer, StyledHeader, StyledSearch, StyledSearchInput, StyledSidebarButton
} from './styled'

function Sidebar() {
  return (
    <StyledContainer>
      <StyledHeader>
        <Tooltip title="User name" placement="right">
          <StyledAvatar />
        </Tooltip>
        <div>

          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVertOutlined />
          </IconButton>
          <IconButton>
            <Logout />
          </IconButton>
        </div>
      </StyledHeader>

      {/* TODO: Search conversations */}
      {/* <StyledSearch>
        <Search color="info" />
        <StyledSearchInput placeholder="Search in your conservation" />
      </StyledSearch> */}

      <StyledSidebarButton>Start your conservation</StyledSidebarButton>
    </StyledContainer>
  )
}

export default Sidebar
