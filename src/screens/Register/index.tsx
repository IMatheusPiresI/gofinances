import React, { useState } from "react";
import * as S from "./styles";

import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";

import {
  Category,
  FormRegisterData,
  TransactionCardType,
  TransactionTypeSelected,
} from "../../@types";

import Button from "../../components/Forms/Button";
import CategorySelect from "../../components/Forms/CategorySelect";
import InputForm from "../../components/Forms/InputForm";
import TransactionTypeButton from "../../components/Forms/TransactionTypeButton";
import CategorySelectModal from "../CategorySelectModal";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../mocks/schemas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Register: React.FC = () => {
  const { user } = useSelector((state: any) => state.authReducer.login);
  const navigation = useNavigation();
  const [transactionType, setTransactionType] =
    useState<TransactionTypeSelected>("");
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [category, setCategory] = useState<Category>({
    key: "category",
    name: "Categoria",
  });
  const dataKey = `@gofinances:transactions_user:${user.id}`;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handleOpenCategoryModal = () => {
    setShowCategoryModal(true);
  };

  const closeSelectCategory = () => {
    setShowCategoryModal(false);
  };

  const handleTransactionTypeSelect = (type: TransactionTypeSelected) => {
    setTransactionType(type);
  };

  const handleRegister = async (form: FormRegisterData) => {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo de transação");
    } else if (category.key === "category") {
      return Alert.alert("Selecione a categoria");
    }

    const newTransactions: TransactionCardType = {
      data: {
        id: String(uuid.v4()),
        name: form.name,
        amount: form.amount,
        type: transactionType,
        category: {
          name: category.name,
          key: category.key,
        },
        date: String(new Date()),
      },
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [...currentData, newTransactions];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      setTransactionType("");
      setCategory({
        key: "category",
        name: "Categoria",
      });
      reset();
      navigation.navigate("Listagem");
    } catch (err) {
      console.log(err);
      Alert.alert("Não foi possível salvar");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>
        <S.Form>
          <S.Fields>
            <InputForm
              placeholder="Nome"
              control={control}
              name="name"
              autoCorrect={false}
              autoCapitalize="words"
              error={errors.name && errors.name.message}
            />
            <InputForm
              placeholder="Preço"
              control={control}
              name="amount"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <S.TransactionsTypes>
              <TransactionTypeButton
                title="Entrada"
                type="positive"
                icon="arrow-up-circle"
                onPress={() => handleTransactionTypeSelect("positive")}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton
                title="Saída"
                type="negative"
                icon="arrow-down-circle"
                onPress={() => handleTransactionTypeSelect("negative")}
                isActive={transactionType === "negative"}
              />
            </S.TransactionsTypes>
            <CategorySelect
              title={category.name}
              onPress={handleOpenCategoryModal}
            />
          </S.Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </S.Form>
        {showCategoryModal && (
          <CategorySelectModal
            category={category}
            closeSelectCategory={closeSelectCategory}
            setCategory={setCategory}
          />
        )}
      </S.Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
