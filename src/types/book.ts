export type BookStatus = 'unread' | 'reading' | 'completed';

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  status: BookStatus;
  rating?: number; // 0-5
  notes?: string;
}
