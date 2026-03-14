export type Message = {
  role: 'bot' | 'user';
  text?: string;
  component?: React.ReactNode;
};
