"use client";

import { adminStore } from "@/stores/adminStore";
import { StyledError, StyledMessage, StyledSection } from "./style";
import { GlobalStyle } from "@/globalStyles/globalstyle";

export const Message = () => {
  const { message, error, setMessage, setError } = adminStore((state) => state);
  return (
    <>
      <GlobalStyle />
      {message !== "" && (
        <StyledSection>
          <StyledMessage>{message}</StyledMessage>
        </StyledSection>
      )}
      {error && (
        <StyledSection>
          <StyledError>{error}</StyledError>
        </StyledSection>
      )}
    </>
  );
};
