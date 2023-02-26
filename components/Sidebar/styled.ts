import { Button, Input } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import styled from 'styled-components'

export const StyledContainer = styled.div`
  height: 100vh;
  min-width: 300px;
  max-width: 350px;

  overflow-y: auto;
  border-right: 1px solid whitesmoke;
  background-color: whitesmoke;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

export const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`

export const StyledHeaderPersonal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;  
`

export const StyledSearch = styled.div`
  display: flex;
  align-self: center;
  padding: 15px;
  border-radius: 2px;
`

export const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: .8;
  }
`

export const StyledSearchInput = styled(Input)`
  width: 100%;
`

export const StyledSidebarButton = styled(Button)`
  width: 100%;

  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`
