import React from "react";
import { TransactionCardType } from "../../@types";
import { categories } from "../../mocks/categories";
import * as S from "./styles";

const TransactionCard: React.FC<TransactionCardType> = ({ data }) => {
  const [category] = categories.filter(
    (item) => item.key === data.category.key
  );
  return (
    <S.Container>
      <S.Title>{data.name}</S.Title>
      <S.Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </S.Amount>
      <S.Footer>
        <S.Category>
          <S.Icon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>
        <S.Date>{data.date}</S.Date>
      </S.Footer>
    </S.Container>
  );
};
export default TransactionCard;
