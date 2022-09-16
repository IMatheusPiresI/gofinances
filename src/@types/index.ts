import { Control } from "react-hook-form";
import { TextInputProps, TouchableOpacityProps } from "react-native";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { SvgProps } from "react-native-svg";

export type TransactionCardType = {
  data: {
    id: string;
    type: "positive" | "negative";
    name: string;
    amount: string;
    category: {
      name: string;
      key: string;
    };
    date: string;
  };
};

export type DataListProps = TransactionCardType & {
  id: string;
};

export type TransactionType = {
  type: "positive" | "negative";
};

export type TransactionTypeSelected = "" | "positive" | "negative";

export type TransactionTypeButtonIsActive = TransactionType & {
  isActive: boolean;
};

export type Category = {
  key: string;
  name: string;
};

export type IsActive = {
  isActive: boolean;
};

export type InputFormTypes = TextInputProps & {
  control: Control;
  name: string;
  error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

export type FormRegisterData = {
  name: string;
  amount: string;
};

export type HighLightData = {
  entries: {
    amount: string;
    lastTransaction: string;
  };
  expensives: {
    amount: string;
    lastTransaction: string;
  };
  total: {
    amount: string;
    lastTransaction: string;
  };
};

export type IHighLightCard = {
  type: "positive" | "negative" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
};

export type IHighLightCardTypes = {
  type: "positive" | "negative" | "total";
};

export type IHistoryCard = {
  title: string;
  amount: string;
  color: string;
};

export type IHistoryCardColor = Pick<IHistoryCard, "color">;

export type ICategorySumData = {
  key: string;
  name: string;
  color: string;
  total: number;
  totalFormatted: string;
  percentFormatted: string;
  percent: number;
};

export type ISignInButtonSocialProps = TouchableOpacityProps & {
  title: string;
  svg: React.FC<SvgProps>;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

export type IAuthData = {
  user: IUser;
};

export type IAuthResponse = {
  params: {
    access_token: string;
  };
  type: string;
};
