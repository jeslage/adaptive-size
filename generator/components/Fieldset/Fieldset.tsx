import { FC } from "react";
import styled from "styled-components";

export interface FieldsetProps {
  label?: string;
  className?: string;
}

const StyledFieldset = styled.fieldset`
  border: 1px solid var(--colors-light);
  outline: none;
  padding: 0;
  border-left: none;
  border-right: none;
  border-bottom: none;
  margin: 0;
  width: 100%;

  legend {
    margin-left: 0px;
    margin-bottom: var(--spacings-s);
    padding: 0 5px 0 0;
    font-size: var(--fontSizes-s);
    color: var(--colors-light);
  }
`;

const Fieldset: FC<FieldsetProps> = ({ label, className, children }) => (
  <StyledFieldset className={className}>
    {label && <legend>{label}</legend>}
    {children}
  </StyledFieldset>
);

export default Fieldset;
