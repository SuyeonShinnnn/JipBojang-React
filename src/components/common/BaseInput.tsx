import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { IoSearch } from 'react-icons/io5';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  padding?: string;
  icon?: string;
  showButton?: boolean;
  buttonIconColor?: string;
  onButtonClick?: () => void;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      label,
      error,
      padding = '1rem 1rem',
      icon,
      disabled,
      showButton = false,
      onButtonClick,
      buttonIconColor,
      ...rest
    },
    ref,
  ) => {
    return (
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

        {rest.children}
        {showButton && (
          <InputButton type="submit" onClick={onButtonClick}>
            <SearchIcon $color={buttonIconColor} />
          </InputButton>
        )}
      </InputContainer>
    );
  },
);

export default BaseInput;

const InputContainer = styled.div`
  position: relative;
`;

const InputButton = styled.button`
  background-color: var(--color-primary);
  border: none;
  border-radius: 8px;
  padding: 8px 12px;

  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const SearchIcon = styled(IoSearch)<{ $color?: string }>`
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
    border-color: var(--color-primary) !important;
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
