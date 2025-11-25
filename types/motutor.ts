// types/motutor.ts

export type LessonLevel = 'elementary' | 'middle' | 'high' | 'undergrad' | 'graduate';

export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  topic: string;
  level: LessonLevel;
  durationMinutes: number;
  objectives: string[];
  createdAt: string;
}
