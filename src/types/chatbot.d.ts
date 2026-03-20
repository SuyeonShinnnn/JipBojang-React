export type Message = {
  role: 'bot' | 'user';
  text?: string;
  component?: React.ReactNode;
};

export type QuizQuestion = {
  question: string;
  choices: string[];
};