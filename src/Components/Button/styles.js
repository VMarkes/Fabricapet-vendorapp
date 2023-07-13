import styled from "styled-components";

export const Button = styled.button`
  padding: 16px 20px;
  outline: none;
  border: 1px solid white;
  border-radius: 5px;
  width: 100%;
  height: 20px;
  cursor: pointer;
  background-color: #1e9ac7;
  color: white;
  font-weight: 600;
  font-size: 16px;
  max-width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 1s;

  &:hover {
    background-color: white;
    border-radius: 5px;
    border: 1px solid #1e9ac7;
    color: #1e9ac7;
  }
`;