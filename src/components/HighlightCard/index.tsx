import React from "react";
import { IHighLightCard } from "../../@types";
import * as S from "./styles";

const HightLightCard: React.FC<IHighLightCard> = ({
  amount,
  lastTransaction,
  title,
  type,
}) => {
  const icons = {
    positive: "arrow-up-circle",
    negative: "arrow-down-circle",
    total: "dollar-sign",
  };
  return (
    <S.Container type={type}>
      <S.Header>
        <S.Title type={type}>{title}</S.Title>
        <S.Icon name={icons[type]} type={type} />
      </S.Header>
      <S.Footer>
        <S.Amount type={type}>{amount}</S.Amount>
        <S.LastTransaction type={type}>{lastTransaction}</S.LastTransaction>
      </S.Footer>
    </S.Container>
  );
};

export default HightLightCard;
