// app/motutor/create/page.tsx
'use client';

import { FormEvent, useState } from 'react';
import { useMoTutor } from '../../../context/MoTutorContext';
import type { LessonPlan, LessonLevel } from '../../../types/motutor';


interface FormState {
  title: string;
  subject: string;
  topic: string;
  level: string;
  durationMinutes: string;
  objectives: string;
}

export default function MoTutorCreatePage() {
  const { addLessonPlan } = useMoTutor();
  const [form, setForm] = useState<FormState>({
    title: '',
    subject: '',
    topic: '',
    level: '',
    durationMinutes: '60',
    objectives: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [jsonPreview, setJsonPreview] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) newErrors.title = 'Required';
    if (!form.subject.trim()) newErrors.subject = 'Required';
    if (!form.topic.trim()) newErrors.topic = 'Required';
    if (!form.level) newErrors.level = 'Required';

    const duration = Number(form.durationMinutes);
    if (!duration || duration <= 0) newErrors.durationMinutes = 'Must be > 0';

    if (!form.objectives.trim()) newErrors.objectives = 'Enter at least one objective';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const now = new Date().toISOString();
    const objectives = form.objectives
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const lesson: LessonPlan = {
      id: `lesson_${Date.now()}`,
      title: form.title.trim(),
      subject: form.subject.trim(),
      topic: form.topic.trim(),
      level: form.level as LessonLevel,
      durationMinutes: Number(form.durationMinutes),
      objectives,
      createdAt: now,
    };

    addLessonPlan(lesson);
    setJsonPreview(JSON.stringify(lesson, null, 2));
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Create a lesson plan</h1>
      <p className="mt-1 text-sm text-gray-600">
        Fill out the fields below. MoTutor will turn this into a structured JSON lesson object.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            placeholder="Introduction to Linear Functions"
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
        </div>

        {/* Subject / Topic / Level */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              placeholder="Mathematics"
            />
            {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Topic <span className="text-red-500">*</span>
            </label>
            <input
              name="topic"
              value={form.topic}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
              placeholder="Linear functions and slope-intercept form"
            />
            {errors.topic && <p className="mt-1 text-xs text-red-600">{errors.topic}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">
                Level <span className="text-red-500">*</span>
            </label>
            <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm text-gray-900"
            >
                <option value="">Select level</option>
                <option value="elementary">Elementary</option>
                <option value="middle">Middle school</option>
                <option value="high">High school</option>
                <option value="undergrad">Undergrad</option>
                <option value="graduate">Graduate</option>
            </select>
            {errors.level && <p className="mt-1 text-xs text-red-600">{errors.level}</p>}
            </div>
        </div>

        {/* Duration */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">
              Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              name="durationMinutes"
              type="number"
              min={1}
              value={form.durationMinutes}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
            />
            {errors.durationMinutes && (
              <p className="mt-1 text-xs text-red-600">{errors.durationMinutes}</p>
            )}
          </div>
        </div>

        {/* Objectives */}
        <div>
          <label className="block text-sm font-medium">
            Objectives (one per line) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="objectives"
            value={form.objectives}
            onChange={handleChange}
            className="mt-1 min-h-[120px] w-full rounded-xl border px-3 py-2 text-sm"
            placeholder={`Example:\nStudents will be able to identify slope and intercept.\nStudents will graph a linear function from an equation.`}
          />
          {errors.objectives && (
            <p className="mt-1 text-xs text-red-600">{errors.objectives}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Save lesson plan
        </button>
      </form>

        {/* JSON Preview */}
        {jsonPreview && (
          <section className="mt-8 rounded-2xl border bg-gray-50 p-4">
            <h2 className="text-sm font-semibold text-gray-800">JSON Output</h2>
            <pre className="mt-3 max-h-80 overflow-auto rounded-2xl bg-black p-4 text-xs text-green-100">
        {jsonPreview}
            </pre>
        </section>
        )}
    </main>
  );
}
