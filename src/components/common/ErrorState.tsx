import styled from 'styled-components';
import BaseButton from './BaseButton';
import { ArrowRotateForwardIcon } from '../../assets/icon/ArrowRotateForwardIcon';
import { WarningIcon } from '../../assets/icon/WarningIcon';

type ErrorType = 'network' | 'empty' | 'auth';

interface ErrorStateProps {
  type?: ErrorType;
  message?: string;
  subMessage?: string;
  buttonMessage?: React.ReactNode;
  disabled?: boolean;
  onRetry?: () => void;
}

const defaultMessages = {
  network: {
    message: '네트워크 오류가 발생했습니다',
    subMessage: '잠시 후 다시 시도해주세요',
  },
  empty: {
    message: '데이터가 없습니다',
    subMessage: '다른 조건으로 검색해보세요',
  },
  auth: {
    message: '권한이 없습니다',
    subMessage: '로그인이 필요합니다',
  },
};

const ErrorState = ({
  type = 'network',
  message,
  subMessage,
  buttonMessage,
  disabled,
  onRetry,
}: ErrorStateProps) => {
  const finalMessage = message ?? defaultMessages[type].message;
  const finalSubMessage = subMessage ?? defaultMessages[type].subMessage;

  return (
    <Container>
      <WarningIcon />

      <span>{finalMessage}</span>
      <span>{finalSubMessage}</span>

      {onRetry && (
        <CustomBaseButton
          size="size2"
          onClick={onRetry}
          variant={disabled ? 'gray' : 'primary'}
          disabled={disabled}
        >
          {buttonMessage ?? (
            <>
              <ArrowRotateForwardIcon />
              재시도
            </>
          )}
        </CustomBaseButton>
      )}
    </Container>
  );
};

export default ErrorState;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;

  justify-content: center;
  align-items: center;

  padding: 20px 0;
  border: 1px dashed rgba(var(--color-primary-dark));
  border-radius: 12px;

  svg {
    color: rgba(var(--color-primary-dark));
    font-size: 100px;
  }

  span {
    color: rgba(var(--color-darkgray));
  }
`;

const CustomBaseButton = styled(BaseButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 50px;

  svg {
    color: #fff;
    font-size: 16px;
  }
`;
