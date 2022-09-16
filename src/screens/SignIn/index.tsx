import React, { useEffect, useState } from "react";
import * as S from "./styles";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import SignInSocialButton from "../../components/SignInSocialButton";
import * as AuthSession from "expo-auth-session";
import { IAuthResponse } from "../../@types";

import { useDispatch } from "react-redux";
import { Creators as ActionCreators } from "../../store/ducks/auth";
import * as AppleAuthentication from "expo-apple-authentication";
import { ActivityIndicator, Platform } from "react-native";
import { useTheme } from "styled-components";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const CLIENT_ID =
        "160524537580-hdnroeouu5od2mqib5877flrh0u3o3mr.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@mathz/gofinances";
      const SCOPE = encodeURI("profile email");
      const RESPONSE_TYPE = "token";
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        )
          .then((res) => res)
          .then((res) => res.json());

        const user = response;

        return dispatch(
          ActionCreators.login({
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              photo: user.picture,
            },
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  const handleSignInWithApple = async () => {
    setIsLoading(true);
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credentials) {
        const name = credentials.fullName!.givenName!;
        return dispatch(
          ActionCreators.login({
            user: {
              id: String(credentials.user),
              email: credentials.email,
              name,
              photo: `https://ui-avatars.com/api/?name=${name}&length=1`,
            },
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <S.Title>
            Controle suas {"\n"} finanças de forma {"\n"} muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>Faça seu login com uma das contas abaixo</S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            title="Entrar com o Google"
            svg={GoogleSvg}
            onPress={handleGoogleSignIn}
          />

          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com a Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </S.FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            size="large"
            style={{ marginTop: 18 }}
          />
        )}
      </S.Footer>
    </S.Container>
  );
};

export default SignIn;
