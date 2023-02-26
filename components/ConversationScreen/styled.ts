import styled from 'styled-components'

export const StyledRecipientHeader = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;

  top: 0;
  display: flex;
  align-items: center;
  padding: 11px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`

export const StyledHeaderInfo = styled.div`
  margin-left: 15px;
  flex-grow: 1;
  color: black;

  > h3 {
    margin-top: 0;
    margin-bottom: 3px;
  }

  > span {
    font-size: 14px;
    color: gray;
  }
`

export const StyledH3 = styled.h3`
  word-break: break-all;
`

export const StyledMessageContainer = styled.div`
  padding: 10px;
  background-color: #e5ded8;
  min-height: 90vh;
`

export const StyledInputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  color: black;

  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`

export const StyledInput = styled.input`
  flex-grow: 1;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 15px;
  margin: 0 15px;
  color: black;
`

export const EndOfMessageForAutoScroll = styled.div`
  padding-bottom: 10px;
  background-color: #e5ded8;
`
