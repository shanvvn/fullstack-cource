# Part 2 - Courseinfo (Exercises 2.1-2.5)

This project implements exercises 2.1-2.5 from the Full Stack Open course Part 2.

## Exercises Completed

### 2.1: Course information step 6
- Created the Course component structure to render course information
- The component displays course name, parts, and exercises

### 2.2: Course information step 7
- Added functionality to show the sum of exercises for each course
- Created the Total component to display the total

### 2.3*: Course information step 8
- Used the `reduce` method to calculate the sum of exercises
- Implementation in `Course.jsx` Total component

### 2.4: Course information step 9
- Extended the application to handle an arbitrary number of courses
- App component now accepts an array of courses and renders all of them

### 2.5: Separate module step 10
- Declared the Course component as a separate module
- Created `src/components/Course.jsx` with all subcomponents:
  - Header
  - Content
  - Part
  - Total

## Component Structure

```
App
  Course
    Header
    Content
      Part (multiple)
    Total
```

## Running the Application

```bash
npm install
npm run dev
```

The application will be available at http://localhost:5176/ (or another port if 5176 is in use).

## Features

- ✅ Renders multiple courses
- ✅ Shows course name and all parts
- ✅ Calculates and displays total exercises using reduce
- ✅ Modular component structure
- ✅ Proper use of keys for list items
