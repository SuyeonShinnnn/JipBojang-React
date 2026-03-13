import styled from 'styled-components';
import { CHECK_LIST_ITEMS } from '../../../constants/chatbot/chatbotMessages';

const ChecklistMessage = () => {
  return (
    <>
      {CHECK_LIST_ITEMS.map((section) => (
        <Section key={section.title}>
          <ListTitle>{section.title}</ListTitle>

          {section.items.map((item) => (
            <Item key={item}>
              <input type="checkbox" />
              <span>{item}</span>
            </Item>
          ))}
        </Section>
      ))}
    </>
  );
};

export default ChecklistMessage;

const Section = styled.div`
  margin-bottom: 16px;
`;

const ListTitle = styled.h4`
  margin-bottom: 4px;
  font-size: 0.95rem;
`;

const Item = styled.label`
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
  color: var(--color-darkgray);
`;
