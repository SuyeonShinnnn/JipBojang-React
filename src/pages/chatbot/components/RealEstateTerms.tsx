import BaseButton from '../../../components/common/BaseButton';
import { REAL_ESTATE_TERM_QUICK_BUTTONS } from '../../../constants/chatbot/quickButtons';
import { ButtonWrapper, ButtonItem } from './ChatBody';

type Props = {
  addMessage: (msg: any) => void;
};

const RealEstateTerms = ({ addMessage }: Props) => {
  const handleClick = (term: string) => {
    addMessage({
      role: 'user',
      text: term,
    });

    addMessage({
      role: 'bot',
      text: `${term}에 대한 설명입니다.`,
    });
  };

  return (
    <ButtonWrapper>
      {REAL_ESTATE_TERM_QUICK_BUTTONS.map((term) => (
        <ButtonItem key={term} $active={false}>
          <BaseButton variant="outline" onClick={() => handleClick(term)}>
            {term}
          </BaseButton>
        </ButtonItem>
      ))}
    </ButtonWrapper>
  );
};

export default RealEstateTerms;
