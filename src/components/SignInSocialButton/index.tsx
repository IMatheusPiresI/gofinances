import React from "react";
import { ISignInButtonSocialProps } from "../../@types";
import * as S from "./styles";

const SignInSocialButton: React.FC<ISignInButtonSocialProps> = ({
  title,
  svg: Svg,
  ...rest
}) => {
  return (
    <S.Button {...rest}>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>

      <S.Text>{title}</S.Text>
    </S.Button>
  );
};

export default SignInSocialButton;
