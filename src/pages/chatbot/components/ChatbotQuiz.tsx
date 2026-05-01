import styled from 'styled-components';
import BaseButton from '../../../components/common/BaseButton';

type QuizQuestion = {
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

type ChatbotQuizProps = {
  question: QuizQuestion;
  answerResult: boolean | null;
  selectedIndex: number | null;
  onAnswer: (index: number) => void;
};

const ChatbotQuiz = ({
  question,
  answerResult,
  selectedIndex,
  onAnswer,
}: ChatbotQuizProps) => {
  return (
    <div>
      <div>Q. {question.question}</div>

      <ButtonWrapper $answered={answerResult !== null}>
        {question.choices.map((choice, i) => {
          const isSelected = selectedIndex === i;
          const isCorrect = question.answerIndex === i;

          return (
            <BaseButton
              key={i}
              onClick={() => onAnswer(i)}
              disabled={answerResult !== null}
              data-correct={isCorrect}
              data-selected={isSelected}
            >
              {i + 1}. {choice}
            </BaseButton>
          );
        })}
      </ButtonWrapper>

      {answerResult !== null && (
        <ResultBox>
          <h4>{answerResult ? '✅ 정답입니다!' : '❌ 오답입니다!'}</h4>
          <p>{question.explanation}</p>
        </ResultBox>
      )}
    </div>
  );
};

export default ChatbotQuiz;

const ButtonWrapper = styled.div<{ $answered: boolean }>`
  margin-top: 8px;
  display: grid;
  gap: 8px;

  button {
    width: 100%;
    font-size: 0.9rem;
    text-align: left;
    justify-content: flex-start;
    padding: 8px 12px;
    color: #000;
    background: white;
    border: 1px solid rgb(var(--color-darkgray));
  }

  ${({ $answered }) =>
    $answered &&
    `
    button[data-correct="true"] {
      background: #d4edda;
      border: 1px solid green;
      color:green;
    }

    button[data-selected="true"]:not([data-correct="true"]) {
      background: #f8d7da;
      border: 1px solid red;
      color:red;
    }
  `}
`;

const ResultBox = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f5f6ff;
  border-radius: 8px;
  display: grid;
  gap: 4px;

  h4 {
    font-weight: 600;
    font-size: 20px;
  }
`;
