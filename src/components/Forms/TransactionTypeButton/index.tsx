import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type TransactionTypeButtonProps = TouchableOpacityProps & {
  title: string;
  type: "positive" | "negative";
  icon: "arrow-up-circle" | "arrow-down-circle";
  isActive: boolean;
};

const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  title,
  type,
  icon,
  isActive,
  ...rest
}) => {
  return (
    <S.Container {...rest} isActive={isActive} type={type}>
      <S.Icon name={icon} type={type} />
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};

export default TransactionTypeButton;
