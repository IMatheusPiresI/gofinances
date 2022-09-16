import { InputFormTypes } from "../../../@types";
import Input from "../Input";
import * as S from "./styles";

import { Controller } from "react-hook-form";

const InputForm: React.FC<InputFormTypes> = ({
  control,
  name,
  error,
  ...rest
}) => {
  return (
    <S.Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {error && <S.Error>{error}</S.Error>}
    </S.Container>
  );
};

export default InputForm;
