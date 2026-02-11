# Phonebook Application - Exercises 2.6-2.10

## Implementation Summary

This phonebook application implements all exercises from 2.6 to 2.10 of the Full Stack Open course.

## Features Implemented

### Exercise 2.6: The Phonebook Step 1
- ✅ Created a simple phonebook application
- ✅ Added ability to add names to the phonebook
- ✅ Form with controlled input for name entry
- ✅ Prevented default form submission behavior

### Exercise 2.7: The Phonebook Step 2
- ✅ Prevented duplicate names from being added
- ✅ Shows alert when attempting to add existing name
- ✅ Used template strings for alert message: `${newName} is already added to phonebook`

### Exercise 2.8: The Phonebook Step 3
- ✅ Added phone number field to the form
- ✅ Users can add both name AND phone number
- ✅ Person objects now contain both name and number properties

### Exercise 2.9: The Phonebook Step 4
- ✅ Implemented search/filter functionality
- ✅ Case-insensitive filtering (e.g., "arto" matches "Arto")
- ✅ Filter input placed outside the form
- ✅ Used hardcoded dummy data for testing

### Exercise 2.10: The Phonebook Step 5
- ✅ Refactored application into separate components:
  - **Filter**: Search filter component
  - **PersonForm**: Form for adding new people
  - **Persons**: Component that renders all people
  - **Person**: Component for rendering a single person's details
- ✅ State and event handlers remain in the App root component
- ✅ Components defined in separate files (not nested within other components)

### Exercise 2.11: The Phonebook Step 6
- ✅ Store initial state in a database file (`db.json`)
- ✅ Use `axios` to fetch data from a JSON server
- ✅ Fetch data using the `useEffect` hook
- ✅ Serve data via `json-server` on port 3001

## Project Structure

```
part2/phonebook/
├── src/
│   ├── components/
│   │   ├── Filter.jsx       # Search filter component
│   │   ├── PersonForm.jsx   # Form for adding persons
│   │   └── Persons.jsx      # List of persons display
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   └── main.jsx             # Entry point
├── package.json
└── vite.config.js
```

## Running the Application

```bash
cd c:\Users\mhdsh\fullstack-cource\part2\phonebook
npm run dev
```

The application is available at: **http://localhost:5178/**

## How to Use

1. **Add a person**: Enter a name and phone number in the form, then click "add"
2. **Search**: Type in the filter field to search for persons by name (case-insensitive)
3. **Duplicate prevention**: Try adding a duplicate name - you'll see an alert

## Initial Data

The app comes with 4 pre-loaded contacts:
- Arto Hellas: 040-123456
- Ada Lovelace: 39-44-5323523
- Dan Abramov: 12-43-234345
- Mary Poppendieck: 39-23-6423122
