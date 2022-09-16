import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

import { Feather } from "@expo/vector-icons";
import { IHighLightCardTypes } from "../../@types";

export const Container = styled.View<IHighLightCardTypes>`
  background-color: ${({ theme, type }) =>
    type !== "total" ? theme.colors.shape : theme.colors.secondary};
  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px 42px;
  height: ${RFValue(220)}px;
  margin-right: 16px;
`;
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Title = styled.Text<IHighLightCardTypes>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type !== "total" ? theme.colors.text_dark : theme.colors.shape};
`;
export const Icon = styled(Feather)<IHighLightCardTypes>`
  color: ${({ theme, type }) => {
    switch (type) {
      case "positive":
        return theme.colors.success;
      case "negative":
        return theme.colors.attention;
      default:
        return theme.colors.shape;
    }
  }};

  font-size: ${RFValue(40)}px;
`;
export const Footer = styled.View``;
export const Amount = styled.Text<IHighLightCardTypes>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) =>
    type !== "total" ? theme.colors.text_dark : theme.colors.shape};
  margin-top: 38px;
`;
export const LastTransaction = styled.Text<IHighLightCardTypes>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type !== "total" ? theme.colors.text : theme.colors.shape};
`;
