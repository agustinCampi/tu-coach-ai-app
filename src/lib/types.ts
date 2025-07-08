export interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface DateSeparator {
    id: string;
    type: 'date';
    date: string;
}

export type ChatItem = Message | DateSeparator;
