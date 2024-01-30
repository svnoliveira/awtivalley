import styled from "styled-components";

export const StyledTable = styled.table`
  width: min(100%, 1000px);
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0px 3px 8px 3px rgba(0, 0, 0, 0.28);
  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const ThCellHeader = styled.th`
  background-color: red;
  color: #fff;
  font-weight: bold;
  padding: 10px;
  text-align: center;
`;

export const ThTitleRow = styled.th`
  /* background-color: #FF7171; */
  color: var(--grey);
  font-size: 18px;
  font-weight: bold;
  height: 40px;
`;
