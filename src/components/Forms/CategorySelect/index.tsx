import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";

type CategorySelectProps = TouchableOpacityProps & {
  title: string;
};

const CategorySelect: React.FC<CategorySelectProps> = ({ title, ...rest }) => {
  return (
    <S.Container {...rest}>
      <S.Category>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  );
};

export default CategorySelect;
