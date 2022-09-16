import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { HighLightData, TransactionCardType } from "../../@types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HightLightCard from "../../components/HighlightCard";

import * as S from "./styles";
import TransactionCard from "../../components/TransactionCard";
import { useFocusEffect } from "@react-navigation/native";
import theme from "../../global/styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { Creators as ActionsCreators } from "../../store/ducks/auth";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.authReducer.login);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<TransactionCardType[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>(
    {} as HighLightData
  );
  function getLastTransactionDate(
    collection: TransactionCardType[],
    type: "positive" | "negative"
  ) {
    const collectionFilttered = collection.filter(
      (transaction) => transaction.data.type === type
    );

    if (collectionFilttered.length === 0) {
      return 0;
    }

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFilttered.map((transaction) =>
          new Date(transaction.data.date).getTime()
        )
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  }

  async function loadingTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;

    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensivesTotal = 0;

    const transactionsFormated: TransactionCardType[] = transactions.map(
      (transaction: TransactionCardType) => {
        const amount = Number(transaction.data.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(transaction.data.date));

        if (transaction.data.type === "positive") {
          entriesTotal += Number(transaction.data.amount);
        } else if (transaction.data.type === "negative") {
          expensivesTotal += Number(transaction.data.amount);
        }

        return {
          data: {
            id: transaction.data.id,
            name: transaction.data.name,
            amount,
            type: transaction.data.type,
            category: transaction.data.category,
            date,
          },
        };
      }
    );
    setTransactions(transactionsFormated);

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval = `01 à ${Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
    }).format(new Date())}`;

    const total = entriesTotal - expensivesTotal;

    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? "Não há transações"
            : `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        amount: expensivesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionExpensives === 0
            ? "Não há transações"
            : `Última saída dia ${lastTransactionExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionEntries === 0 && lastTransactionExpensives === 0
            ? "Não há transações"
            : totalInterval,
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadingTransactions();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadingTransactions();
    }, [])
  );
  return (
    <S.Container>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
          <S.Header>
            <S.UserWrapper>
              <S.UserInfo>
                <S.Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <S.User>
                  <S.UserGreeting>Olá,</S.UserGreeting>
                  <S.UserName>{user.name.split(" ")[0]}</S.UserName>
                </S.User>
              </S.UserInfo>
              <S.LogoutButton
                onPress={() => dispatch(ActionsCreators.logout())}
              >
                <S.Icon name="power" />
              </S.LogoutButton>
            </S.UserWrapper>
          </S.Header>
          <S.HightLightCards>
            <HightLightCard
              amount={highLightData.entries.amount}
              lastTransaction={highLightData.entries.lastTransaction}
              title="Entradas"
              type="positive"
            />
            <HightLightCard
              amount={highLightData.expensives.amount}
              lastTransaction={highLightData.expensives.lastTransaction}
              title="Saídas"
              type="negative"
            />
            <HightLightCard
              amount={highLightData.total.amount}
              lastTransaction={highLightData.total.lastTransaction}
              title="Total"
              type="total"
            />
          </S.HightLightCards>
          <S.Transactions>
            <S.Title>Listagem</S.Title>
            <S.TransactionsList
              data={transactions}
              keyExtractor={(item) => item.data.id}
              renderItem={({ item }) => <TransactionCard data={item.data} />}
            />
          </S.Transactions>
        </>
      )}
    </S.Container>
  );
};

export default Dashboard;
