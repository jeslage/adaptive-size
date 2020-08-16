import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { ToastProvider } from "react-toast-notifications";

import GlobalStyle from "../styles/global";

import { mq } from "../styles";

import { PresetsProvider, SettingsProvider } from "../contexts";

import Text from "../components/Text";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";

const StyledHome = styled.main`
  background: var(--colors-white);

  ${mq("m")} {
    display: flex;
  }

  .home__text {
    flex-grow: 2;
  }

  .home__sidebar {
    flex-shrink: 0;
  }
`;

const IndexPage = () => (
  <SettingsProvider>
    <ToastProvider
      autoDismissTimeout={2000}
      placement="bottom-center"
      components={{ Toast: Toast }}
    >
      <PresetsProvider>
        <Head>
          <title>Adaptive Size Generator</title>
        </Head>
        <StyledHome>
          <Sidebar className="home__sidebar" />
          <Text className="home__text" />
        </StyledHome>
        <GlobalStyle />
      </PresetsProvider>
    </ToastProvider>
  </SettingsProvider>
);

export default IndexPage;
