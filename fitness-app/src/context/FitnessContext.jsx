import React, { createContext, useContext, useState, useEffect } from 'react';

const FitnessContext = createContext();

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

export const FitnessProvider = ({ children }) => {
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [workoutHistory, setWorkoutHistory] = useState([]);

  // Initialize with sample data
  useEffect(() => {
    const samplePlan = {
      Monday: {
        name: 'Chest & Triceps',
        exercises: [
          {
            id: 1,
            name: 'Bench Press',
            sets: 4,
            reps: 8,
            weight: 80,
            targetMuscle: 'Chest'
          },
          {
            id: 2,
            name: 'Incline Dumbbell Press',
            sets: 3,
            reps: 10,
            weight: 30,
            targetMuscle: 'Chest'
          },
          {
            id: 3,
            name: 'Tricep Dips',
            sets: 3,
            reps: 12,
            weight: 0,
            targetMuscle: 'Triceps'
          },
          {
            id: 4,
            name: 'Close-Grip Bench Press',
            sets: 3,
            reps: 10,
            weight: 60,
            targetMuscle: 'Triceps'
          }
        ]
      },
      Tuesday: {
        name: 'Back & Biceps',
        exercises: [
          {
            id: 5,
            name: 'Deadlift',
            sets: 4,
            reps: 6,
            weight: 120,
            targetMuscle: 'Back'
          },
          {
            id: 6,
            name: 'Pull-ups',
            sets: 3,
            reps: 8,
            weight: 0,
            targetMuscle: 'Back'
          },
          {
            id: 7,
            name: 'Barbell Rows',
            sets: 3,
            reps: 10,
            weight: 70,
            targetMuscle: 'Back'
          },
          {
            id: 8,
            name: 'Bicep Curls',
            sets: 3,
            reps: 12,
            weight: 20,
            targetMuscle: 'Biceps'
          }
        ]
      },
      Wednesday: {
        name: 'Rest Day',
        exercises: []
      },
      Thursday: {
        name: 'Legs',
        exercises: [
          {
            id: 9,
            name: 'Squats',
            sets: 4,
            reps: 8,
            weight: 100,
            targetMuscle: 'Legs'
          },
          {
            id: 10,
            name: 'Romanian Deadlift',
            sets: 3,
            reps: 10,
            weight: 80,
            targetMuscle: 'Legs'
          },
          {
            id: 11,
            name: 'Leg Press',
            sets: 3,
            reps: 12,
            weight: 150,
            targetMuscle: 'Legs'
          },
          {
            id: 12,
            name: 'Calf Raises',
            sets: 4,
            reps: 15,
            weight: 40,
            targetMuscle: 'Legs'
          }
        ]
      },
      Friday: {
        name: 'Shoulders & Arms',
        exercises: [
          {
            id: 13,
            name: 'Overhead Press',
            sets: 4,
            reps: 8,
            weight: 50,
            targetMuscle: 'Shoulders'
          },
          {
            id: 14,
            name: 'Lateral Raises',
            sets: 3,
            reps: 12,
            weight: 15,
            targetMuscle: 'Shoulders'
          },
          {
            id: 15,
            name: 'Hammer Curls',
            sets: 3,
            reps: 10,
            weight: 18,
            targetMuscle: 'Biceps'
          },
          {
            id: 16,
            name: 'Tricep Extensions',
            sets: 3,
            reps: 12,
            weight: 25,
            targetMuscle: 'Triceps'
          }
        ]
      },
      Saturday: {
        name: 'Core & Cardio',
        exercises: [
          {
            id: 17,
            name: 'Plank',
            sets: 3,
            reps: 60,
            weight: 0,
            targetMuscle: 'Core'
          },
          {
            id: 18,
            name: 'Russian Twists',
            sets: 3,
            reps: 20,
            weight: 10,
            targetMuscle: 'Core'
          },
          {
            id: 19,
            name: 'Treadmill',
            sets: 1,
            reps: 30,
            weight: 0,
            targetMuscle: 'Cardio'
          }
        ]
      },
      Sunday: {
        name: 'Rest Day',
        exercises: []
      }
    };

    // Generate some sample workout history
    const sampleHistory = [];
    const today = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = DAYS_OF_WEEK[date.getDay() === 0 ? 6 : date.getDay() - 1];
      
      if (samplePlan[dayName] && samplePlan[dayName].exercises.length > 0) {
        const exercises = samplePlan[dayName].exercises.map(exercise => ({
          ...exercise,
          weight: exercise.weight + Math.floor(Math.random() * 10) - 5, // Add some variation
          completedSets: Math.floor(Math.random() * exercise.sets) + 1
        }));
        
        sampleHistory.push({
          id: Date.now() + i,
          date: date.toISOString().split('T')[0],
          dayName,
          workoutName: samplePlan[dayName].name,
          exercises,
          duration: 45 + Math.floor(Math.random() * 30) // 45-75 minutes
        });
      }
    }

    setWorkoutPlan(samplePlan);
    setWorkoutHistory(sampleHistory);
  }, []);

  const addWorkoutSession = (workoutData) => {
    const newWorkout = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...workoutData
    };
    setWorkoutHistory(prev => [newWorkout, ...prev]);
  };

  const updateWorkoutPlan = (day, workoutData) => {
    setWorkoutPlan(prev => ({
      ...prev,
      [day]: workoutData
    }));
  };

  const deleteExercise = (day, exerciseId) => {
    setWorkoutPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        exercises: prev[day].exercises.filter(ex => ex.id !== exerciseId)
      }
    }));
  };

  const addExercise = (day, exercise) => {
    const newExercise = {
      ...exercise,
      id: Date.now()
    };
    
    setWorkoutPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        exercises: [...(prev[day]?.exercises || []), newExercise]
      }
    }));
  };

  const getProgressData = () => {
    const exerciseProgress = {};
    
    workoutHistory.forEach(workout => {
      workout.exercises.forEach(exercise => {
        if (!exerciseProgress[exercise.name]) {
          exerciseProgress[exercise.name] = [];
        }
        exerciseProgress[exercise.name].push({
          date: workout.date,
          weight: exercise.weight,
          reps: exercise.reps,
          sets: exercise.completedSets || exercise.sets
        });
      });
    });

    return exerciseProgress;
  };

  const getStats = () => {
    const totalWorkouts = workoutHistory.length;
    const totalExercises = workoutHistory.reduce((sum, workout) => sum + workout.exercises.length, 0);
    const avgDuration = workoutHistory.length > 0 
      ? Math.round(workoutHistory.reduce((sum, workout) => sum + (workout.duration || 60), 0) / workoutHistory.length)
      : 0;
    
    const thisWeekWorkouts = workoutHistory.filter(workout => {
      const workoutDate = new Date(workout.date);
      const today = new Date();
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      return workoutDate >= weekAgo;
    }).length;

    return {
      totalWorkouts,
      totalExercises,
      avgDuration,
      thisWeekWorkouts
    };
  };

  const value = {
    workoutPlan,
    workoutHistory,
    DAYS_OF_WEEK,
    addWorkoutSession,
    updateWorkoutPlan,
    deleteExercise,
    addExercise,
    getProgressData,
    getStats
  };

  return (
    <FitnessContext.Provider value={value}>
      {children}
    </FitnessContext.Provider>
  );
};