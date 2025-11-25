// app/motutor/page.tsx
'use client';

import Link from 'next/link';
import { useMoTutor } from '../../context/MoTutorContext';


export default function MoTutorLandingPage() {
  const { lessonPlans } = useMoTutor();

  const recent = [...lessonPlans].slice(-3).reverse();

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-8">
      
      {/* Header */}
      <section className="rounded-2xl border bg-white/80 p-6 shadow-sm">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900">MoTutor</h1>
        <p className="mt-2 text-sm text-gray-800">
          AI-assisted lesson planning for tutors and education businesses. Create structured lesson 
          plans in minutes and reuse them across students.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/motutor/create"
            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Create a lesson plan
          </Link>
          <Link
            href="/motutor/view"
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-50"
          >
            View lesson library
          </Link>
        </div>
      </section>

      {/* Activity Feed */}
      <section className="rounded-2xl border bg-white/80 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Activity feed</h2>

        {recent.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">
            No lessons yet. Create your first lesson plan to see it here.
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {recent.map((lp) => (
              <li key={lp.id} className="flex justify-between">
                <span>
                  <span className="font-medium">{lp.title}</span> • {lp.subject} • {lp.level}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(lp.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Key Insights */}
      <section className="rounded-2xl border bg-white/80 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Key insights</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Standardize your lesson structure across tutors.</li>
          <li>Reuse lesson plans for students at the same level.</li>
          <li>Keep a history of what each tutor has planned.</li>
        </ul>
      </section>

    </main>
  );
}