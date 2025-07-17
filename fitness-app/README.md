# 💪 Fitness Tracker

A comprehensive fitness tracking application built with React and modern web technologies. Track your workouts, monitor progress, and analyze your fitness journey with beautiful charts and analytics.

## Features

### 🗓️ Workout Planning
- **Weekly Schedule**: Plan workouts for each day of the week
- **Exercise Management**: Add, edit, and delete exercises with detailed information
- **Muscle Group Targeting**: Organize exercises by muscle groups (Chest, Back, Shoulders, etc.)
- **Weight & Rep Tracking**: Track sets, reps, and weights for each exercise

### 📊 Progress Analytics
- **Exercise Progress Charts**: Visualize weight progression over time
- **Training Volume Analysis**: Track total training volume (Weight × Reps × Sets)
- **Workout Frequency**: Monitor how often you're working out
- **Muscle Group Distribution**: See which muscle groups you're focusing on
- **Performance Stats**: Total workouts, exercises, average duration, and weekly goals

### 📝 Workout Logging
- **Quick Logging**: Log workouts based on your planned routine
- **Custom Workouts**: Create and log custom workouts on the fly
- **Completion Tracking**: Track completed vs planned sets
- **Duration Monitoring**: Log workout duration for time management

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Beautiful Gradients**: Modern glass-morphism design with smooth animations
- **Intuitive Navigation**: Easy-to-use interface with clear visual hierarchy
- **Interactive Charts**: Powered by Recharts for beautiful data visualization

## Sample Workout Plan

The app comes pre-loaded with a sample workout plan:

- **Monday**: Chest & Triceps (Bench Press, Incline Press, Dips, etc.)
- **Tuesday**: Back & Biceps (Deadlifts, Pull-ups, Rows, Curls)
- **Wednesday**: Rest Day
- **Thursday**: Legs (Squats, Romanian Deadlifts, Leg Press, Calf Raises)
- **Friday**: Shoulders & Arms (Overhead Press, Lateral Raises, Curls, Extensions)
- **Saturday**: Core & Cardio (Plank, Russian Twists, Treadmill)
- **Sunday**: Rest Day

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the fitness app directory:
```bash
cd fitness-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
fitness-app/
├── src/
│   ├── components/
│   │   ├── WorkoutPlan.jsx      # Weekly workout schedule
│   │   ├── AddWorkout.jsx       # Log completed workouts
│   │   ├── Analytics.jsx        # Progress charts and stats
│   │   └── ExerciseModal.jsx    # Add/edit exercise modal
│   ├── context/
│   │   └── FitnessContext.jsx   # Global state management
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js
└── index.html
```

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing for single-page application
- **Recharts**: Beautiful and composable charts for React
- **Lucide React**: Modern icon library
- **Vite**: Fast build tool and development server
- **CSS**: Custom CSS with flexbox/grid layouts and modern design

## Data Management

The app uses React Context for state management with the following data structure:

- **Workout Plan**: Weekly schedule with exercises, sets, reps, and weights
- **Workout History**: Log of completed workouts with actual performance data
- **Progress Tracking**: Calculated metrics and analytics based on workout history

## Customization

### Adding New Exercises
1. Go to any day in the workout plan
2. Click "Add Exercise"
3. Select muscle group and exercise name
4. Set your target sets, reps, and weight

### Logging Workouts
1. Navigate to "Add Workout"
2. Select the day and duration
3. Choose between planned workout or custom workout
4. Adjust weights and reps as needed
5. Save your completed workout

### Viewing Progress
1. Visit the "Analytics" page
2. Select time range (7 days to 1 year)
3. Choose specific exercises to track progress
4. Monitor various metrics and charts

## Features in Detail

### Exercise Progress Tracking
- Track weight progression for each exercise over time
- Visualize improvements with line charts
- Compare performance across different time periods

### Volume Analysis
- Calculate total training volume (weight × reps × sets)
- Track volume trends over weeks and months
- Identify when you're pushing harder or taking it easier

### Muscle Group Balance
- Pie chart showing distribution of exercises across muscle groups
- Ensure balanced training across all body parts
- Identify areas that might need more attention

### Workout Consistency
- Bar charts showing workout frequency over time
- Track your consistency and identify patterns
- Set and monitor weekly workout goals

## Contributing

This is a personal fitness tracking application. Feel free to fork and customize it for your own needs!

## Future Enhancements

Potential features that could be added:
- Data persistence with local storage or backend API
- Workout templates and programs
- Social features and sharing
- Photo progress tracking
- Exercise instruction videos
- Nutrition tracking integration
- Wearable device integration

## License

This project is open source and available under the MIT License.