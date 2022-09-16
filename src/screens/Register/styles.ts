import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(112)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${RFValue(19)}px;
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;
`;

export const Fields = styled.View`
  flex: 1;
`;

export const TransactionsTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 16px;
`;
