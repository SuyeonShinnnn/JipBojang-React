import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  header,
  footer,
  children,
}) => {
  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Dialog
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않게
        role="dialog"
        aria-modal="true"
      >
        <Content>
          <Header>
            {header || <h5>Modal Title</h5>}
            <CloseButton onClick={onClose} aria-label="Close">
              ×
            </CloseButton>
          </Header>

          <Body>{children || '기본 모달 내용'}</Body>

          <Footer>
            {footer || (
              <DefaultButton type="button" onClick={onClose}>
                닫기
              </DefaultButton>
            )}
          </Footer>
        </Content>
      </Dialog>
    </Overlay>
  );
};

export default BaseModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
`;

const Dialog = styled.div`
  background: white;
  border-radius: 8px;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
`;

const Content = styled.div`
  border: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: none;
`;

const Body = styled.div`
  padding: 1rem;
  font-weight: 500;
  color: #444;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 1rem;
  border: none;
`;

const DefaultButton = styled.button`
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #6662d6;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: #666;
  transition: 0.2s ease;

  &:hover {
    color: #000;
  }
`;
