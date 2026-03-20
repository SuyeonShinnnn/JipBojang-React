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

import { useTyping } from '../../hooks/useTyping';
import { useLoading } from '../../hooks/useLoading';

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

  const [quickButtons, setQuickButtons] = useState<string[]>(QUICK_BUTTONS);
  const [isSelected, setIsSelected] = useState<number | null>(null);

  const [quizStep, setQuizStep] = useState<'EXPERIENCE' | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [answerResult, setAnswerResult] = useState<boolean | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const { isTyping, typeMessage } = useTyping();
  const { isLoading, dots, startLoading, stopLoading } = useLoading();

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Input 메시지
  const sendMessage = async (text: string) => {
    addMessage({ role: 'user', text });

    startLoading();

    const startTime = Date.now();

    try {
      console.log(isLoading, dots);
      const data = await sendToGPT(text);

      const MIN_LOADING_TIME = 1000;
      const elapsed = Date.now() - startTime;

      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((r) => setTimeout(r, MIN_LOADING_TIME - elapsed));
      }

      stopLoading();

      setMessages((prev) => [...prev, { role: 'bot', text: '' }]);

      await typeMessage(setMessages, data.reply);
    } catch {
      stopLoading();
      addMessage({
        role: 'bot',
        text: '서버 연결에 문제가 발생했습니다.',
      });
    }
  };

  // 부동산 관련 퀴즈
  const startQuiz = async () => {
    startLoading();

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

      stopLoading();

      if (res.data?.question) {
        setCurrentQuestion(res.data);
        setQuizStarted(true);

        setMessages(() => [{ role: 'bot', text: '' }]);
        await typeMessage(setMessages, '퀴즈를 시작합니다! 🎯');
      } else {
        addMessage({ role: 'bot', text: '퀴즈가 종료되었어요!' });
      }
    } catch {
      stopLoading();
      addMessage({
        role: 'bot',
        text: '⚠️ 퀴즈를 불러오는 중 오류 발생',
      });
    }
  };

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

      const isCorrect = res.data;
      setAnswerResult(isCorrect);

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

  // 퀵 버튼 클릭
  const handleButtonClick = async (index: number) => {
    setIsSelected(index);

    const clicked = quickButtons[index];

    addMessage({ role: 'user', text: clicked });

    // 서비스 이용방법
    if (clicked === '서비스 이용방법') {
      setIsSelected(null);
      setQuickButtons([]);
      const msgs = getServiceGuideMessages();

      for (const msg of msgs) {
        setMessages((prev) => [...prev, { role: 'bot', text: '' }]);
        await typeMessage(setMessages, msg.text || '');
      }
      setQuickButtons(QUICK_BUTTONS);
      return;
    }

    // 부동산 용어
    if (clicked === '부동산 용어') {
      setIsSelected(null);
      setQuickButtons([]);

      setMessages((prev) => [...prev, { role: 'bot', text: '' }]);
      await typeMessage(setMessages, REAL_ESTATE_INTRO);

      setQuickButtons(REAL_ESTATE_TERM_QUICK_BUTTONS);
      return;
    }

    // 용어 상세
    if (REAL_ESTATE_TERM_QUICK_BUTTONS.includes(clicked)) {
      const desc = GLOSSARY[clicked as keyof typeof GLOSSARY];

      setMessages((prev) => [...prev, { role: 'bot', text: '' }]);
      await typeMessage(setMessages, desc);
      return;
    }

    // 전세 사기
    if (clicked === '전세 사기 유형') {
      setIsSelected(null);
      setQuickButtons([]);
      startLoading();

      const botReply = await sendToGPT('전세 사기 유형');

      stopLoading();

      setMessages((prev) => [...prev, { role: 'bot', text: '' }]);
      await typeMessage(setMessages, botReply);

      setQuickButtons(QUICK_BUTTONS);
      return;
    }

    // 퀴즈 진입
    if (clicked === '부동산 거래 퀴즈') {
      setMessages((prev) => [...prev, { role: 'bot', text: '' }]);
      await typeMessage(setMessages, REAL_ESTATE_QUIZ_INTRO);

      setQuickButtons(REAL_ESTATE_QUIZ_EXPERIENCE_OPTIONS);
      setQuizStep('EXPERIENCE');
      return;
    }

    // 퀴즈 경험 선택
    if (quizStep === 'EXPERIENCE') {
      if (clicked === '네, 처음이에요!') {
        setMessages(() => [{ role: 'bot', text: '' }]);
        await typeMessage(
          setMessages,
          '부동산 거래 퀴즈에 오신 걸 환영합니다! 🥳\n퀴즈는 총 5문제로 구성되어 있어요.',
        );
      } else {
        setMessages((prev) => [...prev, { role: 'bot', text: '' }]);
        await typeMessage(setMessages, '좋아요! 다시 도전해볼까요?');
      }
      await setMessages((prev) => [
        ...prev,
        { role: 'bot', text: '문제를 생성 중입니다.\n 잠시만 기다려주세요😊' },
      ]);

      setQuizStep(null);
      setQuickButtons([]);

      await startQuiz();
      return;
    }

    // 체크리스트
    if (clicked === '부동산 거래 전 체크리스트') {
      setMessages((prev) => [...prev, { role: 'bot', text: '' }]);
      await typeMessage(setMessages, CHECK_LIST_INTRO);

      addMessage({
        role: 'bot',
        component: <ChecklistMessage />,
      });

      return;
    }

    // 다시하기
    if (clicked === '🔁 다시 도전하기') {
      setCorrectCount(0);
      await startQuiz();
      return;
    }

    // 처음으로
    if (clicked === '🏠 처음으로') {
      setMessages([
        {
          role: 'bot',
          text: '안녕하세요. 집보장 AI 챗봇입니다.\n궁금한 내용을 선택하거나 입력해주세요.',
        },
      ]);
      setIsSelected(null);
      setQuickButtons(QUICK_BUTTONS);
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
    handleAnswer,
    isLoading,
    dots,
    isTyping,
    selectedIndex,
  };
};
