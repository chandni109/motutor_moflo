// app/motutor/view/page.tsx
'use client';

import { useState } from 'react';
import { useMoTutor } from '../../../context/MoTutorContext';
import type { LessonPlan } from '../../../types/motutor';

type ViewMode = 'grid' | 'table';

export default function MoTutorViewPage() {
  const { lessonPlans, deleteLessonPlan } = useMoTutor();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const hasLessons = lessonPlans.length > 0;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Lesson library</h1>
          <p className="mt-1 text-sm text-gray-600">
            View and manage the lesson plans you&apos;ve created.
          </p>
        </div>

        {/* view switch */}
        <div className="inline-flex rounded-xl border bg-white p-1 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`rounded-lg px-3 py-1 ${
              viewMode === 'grid' ? 'bg-black text-white' : 'text-gray-700'
            }`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`rounded-lg px-3 py-1 ${
              viewMode === 'table' ? 'bg-black text-white' : 'text-gray-700'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Empty state */}
      {!hasLessons && (
        <p className="mt-6 text-sm text-gray-500">
          No lessons yet. Go to <code>/motutor/create</code> to add one.
        </p>
      )}

      {/* GRID VIEW */}
      {hasLessons && viewMode === 'grid' && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lessonPlans.map((lp) => (
            <article
              key={lp.id}
              className="flex flex-col justify-between rounded-2xl border bg-white p-4 text-sm shadow-sm"
            >
              <div>
                <h2 className="text-sm font-semibold">{lp.title}</h2>
                <p className="mt-1 text-xs text-gray-500">{lp.subject} • {lp.topic}</p>
                <p className="mt-2 text-xs text-gray-500">
                  Level: {lp.level} • {lp.durationMinutes} min
                </p>
              </div>
              <div className="mt-3 flex justify-between text-xs text-gray-500">
                <span>{lp.objectives.length} objective(s)</span>
                <button
                  type="button"
                  onClick={() => deleteLessonPlan(lp.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {hasLessons && viewMode === 'table' && (
    <div className="mt-6 overflow-x-auto rounded-2xl border bg-white shadow-sm">
        <table className="min-w-full text-left text-xs text-gray-900">
        <thead className="border-b bg-gray-100 text-gray-900">
            <tr className="font-semibold">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Objectives</th>
            <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>

            <tbody>
            {lessonPlans.map((lp: LessonPlan) => (
            <tr key={lp.id} className="border-t text-gray-900">
                <td className="px-4 py-2">{lp.title}</td>
                <td className="px-4 py-2">{lp.subject}</td>
                <td className="px-4 py-2">{lp.level}</td>
                <td className="px-4 py-2">{lp.durationMinutes} min</td>
                <td className="px-4 py-2">{lp.objectives.length}</td>
                <td className="px-4 py-2">
                    <button
                    type="button"
                    onClick={() => deleteLessonPlan(lp.id)}
                    className="text-red-600 hover:underline"
                    >
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>

          </table>
        </div>
      )}
    </main>
  );
}
