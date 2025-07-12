import styled from 'styled-components'

export const ModalContainer = styled.div`
  min-height: 200px;
  background: #fff;
  padding: 0px 0px 20px 0px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000;
  position: relative;

  .title {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #000;
    background: #eee;
    font-size: 16px;
    font-weight: 600;
    border-radius: 10px 10px 0px 0px;
  }
`
