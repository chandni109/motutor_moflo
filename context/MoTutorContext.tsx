// context/MoTutorContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import type { LessonPlan } from '../types/motutor';

interface MoTutorContextValue {
  lessonPlans: LessonPlan[];
  addLessonPlan: (plan: LessonPlan) => void;
  deleteLessonPlan: (id: string) => void;
}

const MoTutorContext = createContext<MoTutorContextValue | undefined>(undefined);

export function MoTutorProvider({ children }: { children: React.ReactNode }) {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);

  const addLessonPlan = (plan: LessonPlan) => {
    setLessonPlans((prev) => [...prev, plan]);
  };

  const deleteLessonPlan = (id: string) => {
    setLessonPlans((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <MoTutorContext.Provider value={{ lessonPlans, addLessonPlan, deleteLessonPlan }}>
      {children}
    </MoTutorContext.Provider>
  );
}

export function useMoTutor() {
  const ctx = useContext(MoTutorContext);
  if (!ctx) throw new Error('useMoTutor must be used inside MoTutorProvider');
  return ctx;
}
