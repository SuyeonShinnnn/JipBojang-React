import styled from 'styled-components';
import BaseButton from '../../components/common/BaseButton';
import BaseInput from '../../components/common/BaseInput';
import { useState } from 'react';
import BaseModal from '../../components/common/BaseModal';
import { useNavigate } from 'react-router-dom';
import { createReport } from '../../apis/reportApi';
import { useAuthStore } from '../../stores/auth';

const ReportFormPage = () => {
  const navigate = useNavigate();
  const auth = useAuthStore();

  const [address, setAddress] = useState('');
  const [type, setType] = useState('전세');
  const [price, setPrice] = useState(0);

  const [submitting, setSubmitting] = useState(false);

  const [formattedPrice, setFormattedPrice] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  let [omissionItem, setOmissionItem] = useState('');

  const priceFormat = (value: number) => {
    if (value < 9999) {
      setFormattedPrice(value + '원');
    } else if (value < 99999999) {
      setFormattedPrice(value / 10000 + '만원');
    } else {
      setFormattedPrice(value / 100000000 + '억원');
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    if (address.trim() == '') {
      setOmissionItem('주소를');
      setIsModalOpen(true);
    } else if (price === 0) {
      setOmissionItem('가격을');
    } else {
      const userId = Number(auth.user.userId);
      const res = await createReport(address, type, price, userId);
      const reportId = res.data.reportId;
      localStorage.setItem('reportId', reportId);

      navigate('/report/progress');

      setSubmitting(false);
    }
  };

  return (
    <>
      <Wrapper>
        <Header>
          <h1>전세 사기 위험 진단</h1>
          <p>간단한 정보 입력으로 내 계약의 위험도를 확인해보세요.</p>
        </Header>

        <FormCard>
          <Section>
            <h3>📍 주소 검색</h3>
            <BaseInput
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              showButton={true}
              placeholder="예) 서울특별시 강남구 테헤란로 123"
            />
            <small>
              도로명 주소로 조회되지 않으면 지번 주소를 입력해 보세요.
            </small>
          </Section>

          <Section>
            <h3>🏠 거래 유형</h3>
            <ButtonWrapper>
              <BaseButton
                variant={type === '전세' ? 'primary' : 'options'}
                onClick={() => setType('전세')}
              >
                전세
              </BaseButton>
              <BaseButton
                variant={type === '월세' ? 'primary' : 'options'}
                onClick={() => setType('월세')}
              >
                월세
              </BaseButton>
            </ButtonWrapper>
          </Section>

          <Section>
            <h3>💰 거래 금액</h3>
            <BaseInput
              placeholder="보증금액을 입력해 주세요."
              type="number"
              min="0"
              onKeyDown={(e) => {
                if (e.key === '-' || e.key === 'e') {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                const value = Number(e.target.value);
                setPrice(value);
                priceFormat(value);
              }}
            />
            <small>{formattedPrice}</small>
          </Section>

          <StartButton onClick={() => handleSubmit()} disabled={submitting}>
            {submitting ? '생성 중...' : '제출하기'}
          </StartButton>
        </FormCard>
      </Wrapper>
      {isModalOpen && (
        <BaseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          header={<h3>🚨필수 입력 누락</h3>}
        >
          {omissionItem} 입력해 주세요.
        </BaseModal>
      )}
    </>
  );
};

export default ReportFormPage;

const Wrapper = styled.main`
  min-height: 100vh;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
  }

  p {
    margin-top: 0.5rem;
    color: var(--color-darkgray);
  }
`;

const FormCard = styled.section`
  width: 100%;
  max-width: 520px;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const Section = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  h3 {
    font-size: 1rem;
    font-weight: 600;
  }

  small {
    color: var(--color-darkgray);
    font-size: 0.8rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;

  button {
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
`;

const StartButton = styled(BaseButton)`
  position: relative;
  overflow: hidden;
  background: var(--color-primary);
  color: #fff;
  z-index: 1;

  &:after {
    position: absolute;
    content: '';
    width: 0;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background: var(--color-primary-dark);
    transition: all 0.3s ease;
  }

  &:hover:after {
    left: 0;
    width: 100%;
  }

  &:active {
    top: 2px;
  }
`;
