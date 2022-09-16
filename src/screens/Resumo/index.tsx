import React, { useCallback, useEffect, useState } from "react";
import HistoryCard from "../../components/HistoryCard";
import * as S from "./styles";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ICategorySumData, TransactionCardType } from "../../@types";
import { categories } from "../../mocks/categories";

import { ActivityIndicator } from "react-native";

import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useFocusEffect } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths, subMonths, format } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR";
import { useSelector } from "react-redux";

const Resumo: React.FC = () => {
  const { user } = useSelector((state: any) => state.authReducer.login);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<
    ICategorySumData[]
  >([]);

  const theme = useTheme();

  const handleDateChange = (action: "next" | "prev") => {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const data: TransactionCardType[] = JSON.parse(response);
    const expensives = data.filter(
      (transaction) =>
        transaction.data.type === "negative" &&
        new Date(transaction.data.date).getMonth() ===
          selectedDate.getMonth() &&
        new Date(transaction.data.date).getFullYear() ===
          selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acc: number, expensive: TransactionCardType) => {
        return acc + Number(expensive.data.amount);
      },
      0
    );

    const totalByCategory: ICategorySumData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive) => {
        if (expensive.data.category.key === category.key) {
          categorySum += Number(expensive.data.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const percent = (categorySum / expensivesTotal) * 100;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
          percentFormatted: `${percent.toFixed(0)}%`,
        });
      }
    });
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo</S.Title>
      </S.Header>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <S.Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <S.MonthSelect>
            <S.MonthSelectButton onPress={() => handleDateChange("prev")}>
              <S.MonthSelectIcon name="chevron-left" />
            </S.MonthSelectButton>
            <S.Month>
              {format(selectedDate, "MMMM, yyyy", {
                locale: ptBR,
              })}
            </S.Month>
            <S.MonthSelectButton onPress={() => handleDateChange("next")}>
              <S.MonthSelectIcon name="chevron-right" />
            </S.MonthSelectButton>
          </S.MonthSelect>
          <S.ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x="percentFormatted"
              y="total"
              colorScale={totalByCategories.map((category) => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
            />
          </S.ChartContainer>
          {totalByCategories.map((category) => (
            <HistoryCard
              key={category.key}
              title={category.name}
              amount={category.totalFormatted}
              color={category.color}
            />
          ))}
        </S.Content>
      )}
    </S.Container>
  );
};

export default Resumo;
