# MoTutor — Lesson Planning Assistant 
MoTutor is a simple lesson-planning tool I built for the Mo-Something Activity Assignment. The goal was to take a real small-business workflow which in this case, it is tutors creating lesson plans and turning it into a clean, structured, repeatable process inside a Next.js app.
Instead of tutors rewriting the same content over and over, MoTutor helps standardize lesson planning and generates a consistent JSON structure that could eventually plug into larger AI tools or document generation workflows.

## Features
# Landing Page — `/motutor`
- Overview of the app  
- Buttons to create or view lessons  
- Recent activity feed  
- “Insight” notes about how the tool could be used  

# Create Page — `/motutor/create`
- Form for entering lesson details  
- Input validation and error messages  
- Generates a structured JSON lesson plan  
- Saves lessons to global context  
- JSON preview box (used for assignment submission)  

# View Page — `/motutor/view`
- Displays all saved lesson plans  
- Two modes: Grid View and Table View  
- Ability to delete lessons  
- Fully responsive layout  

# Tech Stack
- Next.js 15 (App Router)  
- React  
- TypeScript  
- Tailwind CSS  
- React Context for global state  

# How to Run the Project
If you want to run MoTutor locally, here’s the exact process:
# Install dependencies and run
Make sure you are in the project folder, then install everything: npm install
Then run 'npm run dev' to start the server
After that is running, visit the website: http://localhost:3000/motutor
# Stop the server
Just press the two keys: Ctrl + C

