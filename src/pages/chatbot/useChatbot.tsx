import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { axiosFetch, sendToGPT } from '../../apis/chatbotApi';

import {
  QUICK_BUTTONS,
  REAL_ESTATE_TERM_QUICK_BUTTONS,
  REAL_ESTATE_QUIZ_EXPERIENCE_OPTIONS,
  QUIZ_FINISHED_QUICK_BUTTONS,
} from '../../constants/chatbot/quickButtons';

import {
  REAL_ESTATE_INTRO,
  REAL_ESTATE_QUIZ_INTRO,
  CHECK_LIST_INTRO,
  GLOSSARY,
} from '../../constants/chatbot/chatbotMessages';

import { getServiceGuideMessages } from './chatbotHandler';
import ChecklistMessage from './components/ChecklistMessage';

export type Message = {
  role: 'bot' | 'user';
  text?: string;
  component?: React.ReactNode;
};

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: '안녕하세요. 집보장 AI 챗봇입니다.\n궁금한 내용을 선택하거나 입력해주세요.',
    },
  ]);

  type QuizQuestion = {
    question: string;
    choices: string[];
    answerIndex: number;
    explanation: string;
  };

  const [quickButtons, setQuickButtons] = useState<string[]>(QUICK_BUTTONS);
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [quizStep, setQuizStep] = useState<'EXPERIENCE' | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [explanation, setExplanation] = useState<string>('');
  const [correctCount, setCorrectCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(
    null,
  );
  const [answerResult, setAnswerResult] = useState<boolean | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  /**
   * 일반 메시지
   */
  const sendMessage = async (text: string) => {
    addMessage({ role: 'user', text });

    try {
      const data = await sendToGPT(text);
      addMessage({ role: 'bot', text: data.reply });
    } catch {
      addMessage({
        role: 'bot',
        text: '서버 연결에 문제가 발생했습니다.',
      });
    }
  };

  /**
   * 퀴즈 시작
   */
  const startQuiz = async () => {
    addMessage({
      role: 'bot',
      text: '문제를 생성 중입니다.\n잠시만 기다려주세요😊',
    });

    let currentSession = sessionId;

    if (!currentSession) {
      const saved = localStorage.getItem('quizSessionId');
      if (saved) {
        currentSession = saved;
        setSessionId(saved);
      } else {
        const newSession = uuidv4();
        setSessionId(newSession);
        localStorage.setItem('quizSessionId', newSession);
        currentSession = newSession;
      }
    }

    try {
      await axiosFetch({
        method: 'post',
        url: '/api/quiz/start',
        params: { sessionId: currentSession },
      });

      const res = await axiosFetch({
        method: 'get',
        url: '/api/quiz/next',
        params: { sessionId: currentSession },
      });

      if (res.data?.question && Array.isArray(res.data.choices)) {
        setCurrentQuestion(res.data);
        setQuizStarted(true);
        setAnswerResult(null);
      } else {
        addMessage({ role: 'bot', text: '퀴즈가 종료되었어요!' });
      }
    } catch (e) {
      addMessage({
        role: 'bot',
        text: '⚠️ 퀴즈를 불러오는 중 오류가 발생했어요!',
      });
    }
  };

  /**
   * 정답 처리
   */
  const handleAnswer = async (index: number) => {
    try {
      setSelectedIndex(index);

      const res = await axiosFetch({
        method: 'post',
        url: '/api/quiz/answer',
        params: {
          sessionId,
          selected: index,
        },
      });

      console.log(res);
      console.log('선택: ' + index);
      console.log('정답: ' + res.data);

      const isCorrect = res.data;
      setAnswerResult(isCorrect);

      // 정답 카운트
      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
      }

      setTimeout(async () => {
        try {
          const next = await axiosFetch({
            method: 'get',
            url: '/api/quiz/next',
            params: { sessionId },
          });

          // 다음 문제 있음
          setCurrentQuestion(next.data);
          setAnswerResult(null);
          setSelectedIndex(null);
        } catch (err: any) {
          if (err.response?.status === 404) {
            const finalCount = isCorrect ? correctCount + 1 : correctCount;

            addMessage({
              role: 'bot',
              text: `🎉 퀴즈 종료!\n총 ${finalCount}문제 맞췄어요!`,
            });

            setQuizStarted(false);
            setCurrentQuestion(null);
            setSelectedIndex(null);
            setAnswerResult(null);
            setQuickButtons(QUIZ_FINISHED_QUICK_BUTTONS);
            setIsSelected(null);
          } else {
            addMessage({
              role: 'bot',
              text: '⚠️ 다음 문제 불러오기 실패',
            });
          }
        }
      }, 2000);
    } catch {
      addMessage({
        role: 'bot',
        text: '⚠️ 정답 처리 중 오류 발생',
      });
    }
  };

  /**
   * 버튼 클릭
   */
  const handleButtonClick = async (index: number) => {
    setIsSelected(index);

    const clicked = quickButtons[index];

    addMessage({
      role: 'user',
      text: clicked,
    });

    if (clicked === '🔁 다시 도전하기') {
      setCorrectCount(0);
      setSelectedIndex(null);
      setAnswerResult(null);
      setCurrentQuestion(null);
      setQuizStarted(false);
      setQuickButtons([]);
      await startQuiz(); // 다시 시작
      return;
    }

    if (clicked === '🏠 처음으로') {
      setMessages([
        {
          role: 'bot',
          text: '안녕하세요. 집보장 AI 챗봇입니다.\n궁금한 내용을 선택하거나 입력해주세요.',
        },
      ]);

      setQuickButtons(QUICK_BUTTONS);
      setIsSelected(null);

      // 상태 초기화
      setQuizStarted(false);
      setCurrentQuestion(null);
      setSelectedIndex(null);
      setAnswerResult(null);
      setCorrectCount(0);

      return;
    }

    // 서비스 안내
    if (clicked === '서비스 이용방법') {
      setMessages((prev) => [...prev, ...getServiceGuideMessages()]);
      return;
    }

    // 부동산 용어
    if (clicked === '부동산 용어') {
      addMessage({ role: 'bot', text: REAL_ESTATE_INTRO });
      setQuickButtons(REAL_ESTATE_TERM_QUICK_BUTTONS);
      setIsSelected(null);
      return;
    }

    if (REAL_ESTATE_TERM_QUICK_BUTTONS.includes(clicked)) {
      const description = GLOSSARY[clicked as keyof typeof GLOSSARY];
      addMessage({ role: 'bot', text: description });
      return;
    }

    // 전세 사기
    if (clicked === '전세 사기 유형') {
      const botReply = await sendToGPT('전세 사기 유형');
      addMessage({ role: 'bot', text: botReply });
      return;
    }

    // 퀴즈 진입
    if (clicked === '부동산 거래 퀴즈') {
      addMessage({ role: 'bot', text: REAL_ESTATE_QUIZ_INTRO });

      setQuickButtons(REAL_ESTATE_QUIZ_EXPERIENCE_OPTIONS);
      setQuizStep('EXPERIENCE');
      setIsSelected(null);
      return;
    }

    // 퀴즈 경험 선택
    if (quizStep === 'EXPERIENCE') {
      if (clicked === '네, 처음이에요!') {
        addMessage({
          role: 'bot',
          text: '부동산 거래 퀴즈에 오신 걸 환영합니다! 🥳\n퀴즈는 총 5문제로 구성되어 있어요.',
        });
      } else {
        addMessage({
          role: 'bot',
          text: '좋아요! 다시 한 번 도전해볼까요?',
        });
      }

      setQuizStep(null);
      setQuickButtons([]);

      await startQuiz();

      return;
    }

    // 체크리스트
    if (clicked === '부동산 거래 전 체크리스트') {
      addMessage({ role: 'bot', text: CHECK_LIST_INTRO });
      addMessage({
        role: 'bot',
        component: <ChecklistMessage />,
      });

      setIsSelected(null);
      return;
    }
  };

  return {
    messages,
    quickButtons,
    isSelected,
    sendMessage,
    handleButtonClick,
    currentQuestion,
    answerResult,
    quizStarted,
    setCurrentQuestion,
    setAnswerResult,
    setQuizStarted,
    handleAnswer,
    explanation,
    selectedIndex,
  };
};
