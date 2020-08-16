import React from "react";
import styled from "styled-components";

const StyledLoadingIndicator = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .loadingIndicator {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }

  .loadingIndicator div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .loadingIndicator div:nth-child(1) {
    left: 6px;
    animation: loadingIndicator1 0.6s infinite;
  }

  .loadingIndicator div:nth-child(2) {
    left: 6px;
    animation: loadingIndicator2 0.6s infinite;
  }

  .loadingIndicator div:nth-child(3) {
    left: 26px;
    animation: loadingIndicator2 0.6s infinite;
  }

  .loadingIndicator div:nth-child(4) {
    left: 45px;
    animation: loadingIndicator3 0.6s infinite;
  }

  @keyframes loadingIndicator1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes loadingIndicator3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }

  @keyframes loadingIndicator2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }
`;

const LoadingIndicator = () => (
  <StyledLoadingIndicator>
    <div className="loadingIndicator">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </StyledLoadingIndicator>
);

export default LoadingIndicator;
