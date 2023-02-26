import styled from 'styled-components'

export const StyledMessage = styled.div`
  width: fit-content;
  word-break: break-all;
  max-width: 90%;
  min-width: 30%;
  color: black;

  padding: 15px 15px 30px;
  margin: 10px;
  border-radius: 8px;
  position: relative;
`

export const StyledSenderMessage = styled(StyledMessage)`
  margin-left: auto;
  background-color: #dcf8c6;
`

export const StyledReceiverMessage = styled(StyledMessage)`
  background-color: whitesmoke;
`

export const StyledTimeStamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: x-small;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
`
