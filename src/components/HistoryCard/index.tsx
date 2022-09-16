import React from "react";
import * as S from "./styles";

import { IHistoryCard } from "../../@types";

const HistoryCard: React.FC<IHistoryCard> = ({ color, amount, title }) => {
  return (
    <S.Container color={color}>
      <S.Title>{title}</S.Title>
      <S.Amount>{amount}</S.Amount>
    </S.Container>
  );
};

export default HistoryCard;
