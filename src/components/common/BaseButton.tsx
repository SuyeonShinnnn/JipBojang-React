import React from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'gray'
  | 'options'
  | 'selected';
type ButtonSize = 'size2' | 'size3' | 'size4' | 'size5' | 'size-address';

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  htmlType?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  htmlType = 'button',
  variant = 'primary',
  size = 'size3',
  disabled = false,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      type={htmlType}
      $variant={variant}
      $size={size}
      disabled={disabled}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default BaseButton;

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition:
    0.2s ease,
    color 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ $size }) => {
    switch ($size) {
      case 'size2':
        return css`
          padding: 0.7rem 2rem;
          font-size: 0.875rem;
        `;
      case 'size-address':
        return css`
          padding: 0 2.5rem;
          font-size: 1rem;
          height: 60px;
        `;
      case 'size4':
        return css`
          padding: 0.9rem 4rem;
          font-size: 1.125rem;
        `;
      case 'size5':
        return css`
          padding: 1rem 5rem;
          font-size: 1.25rem;
        `;
      default:
        return css`
          padding: 0.8rem 3rem;
          font-size: 1rem;
        `;
    }
  }}

  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary':
        return css`
          background-color: rgb(var(--color-accent));
          border: 1px solid rgb(var(--color-accent));
          color: #000;
        `;
      case 'outline':
        return css`
          background-color: white;
          border: 1px solid rgb(var(--color-primary));
          color: rgb(var(--color-primary));
        `;
      case 'gray':
        return css`
          background-color: #838789;
          border: 1px solid #838789;
          color: white;
        `;
      case 'options':
        return css`
          background-color: white;
          border: 1px solid rgb(var(--color-lightgray));
        `;
      case 'selected':
        return css`
          background-color: white;
          border: 1px solid rgb(var(--color-primary));
        `;
      default:
        return css`
          background-color: rgb(var(--color-primary));
          color: white;
          border: 1px solid rgb(var(--color-primary));
        `;
    }
  }}

  &:disabled {
    color: rgb(var(--color-darkgray));
    background-color: #d9d9d9;
    border: 1px solid rgb(var(--color-mediumgray));
    cursor: not-allowed;
    pointer-events: none;
  }
`;
