import React, { forwardRef, type ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { SearchIcon } from '../../assets/icon/SearchIcon';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  padding?: string;
  showButton?: boolean;
  buttonContent?: ReactNode;
  buttonIconColor?: string;
  onButtonClick?: () => void;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      label,
      error,
      padding = '1rem 1rem',
      disabled,
      showButton = false,
      buttonContent,
      onButtonClick,
      buttonIconColor,
      id,
      ...rest
    },
    ref,
  ) => {
    return (
      <InputContainer>
        {label && <Label htmlFor={id}>{label}</Label>}

        <InputWrapper>
          <StyledInput
            ref={ref}
            id={id}
            disabled={disabled}
            $hasError={!!error}
            $padding={padding}
            {...rest}
          />

          {showButton && (
            <InputButton type="button" onClick={onButtonClick}>
              {buttonContent ?? <CustomIcon $color={buttonIconColor} />}
            </InputButton>
          )}
        </InputWrapper>

        {error && <ErrorText>{error}</ErrorText>}
      </InputContainer>
    );
  },
);

export default BaseInput;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Label = styled.label`
  font-size: 0.95rem;
  font-weight: 500;
`;

const InputButton = styled.button`
  color: #fff;
  background-color: rgb(var(--color-primary));
  border: none;
  border-radius: 8px;
  padding: 8px 12px;

  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const CustomIcon = styled(SearchIcon)<{ $color?: string }>`
  font-size: 20px;
  color: ${({ $color }) => $color || '#fff'};
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
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  padding: ${({ $padding }) => $padding};

  &:focus {
    border-color: rgb(var(--color-primary));
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

const ErrorText = styled.span`
  font-size: 0.85rem;
  color: #e74c3c;
`;
