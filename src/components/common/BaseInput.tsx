import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  padding?: string;
  icon?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, padding = '1rem 1rem', icon, disabled, ...rest }, ref) => {
    return (
      <Wrapper>
        {label && <Label>{label}</Label>}

        <InputContainer>
          <StyledInput
            ref={ref}
            disabled={disabled}
            $hasError={!!error}
            $padding={padding}
            {...rest}
          />

          {icon && (
            <Icon>
              <i className={`bi bi-${icon}`} />
            </Icon>
          )}

          {/* 커스텀 아이콘 슬롯처럼 children으로 받는 영역 */}
          {rest.children}
        </InputContainer>

        {error && <ErrorText>{error}</ErrorText>}
      </Wrapper>
    );
  }
);

export default BaseInput;

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const InputContainer = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{
  $hasError: boolean;
  $padding: string;
}>`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  padding: ${({ $padding }) => $padding};

  &:focus {
    border-color: var(--color-primary) !important;
    box-shadow: 0 0 0 0.2rem rgba(119, 116, 234, 0.25) !important;
    outline: none;
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: #e74c3c;
    `}

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
    color: #999;
  }
`;

const Icon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1.2rem;
  pointer-events: none;
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
