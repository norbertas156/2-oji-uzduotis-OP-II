import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import ExerciseModal from './ExerciseModal';

const WorkoutPlan = () => {
  const { workoutPlan, DAYS_OF_WEEK, deleteExercise, addExercise } = useFitness();
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [editingExercise, setEditingExercise] = useState(null);

  const handleAddExercise = (day) => {
    setSelectedDay(day);
    setEditingExercise(null);
    setShowModal(true);
  };

  const handleEditExercise = (day, exercise) => {
    setSelectedDay(day);
    setEditingExercise(exercise);
    setShowModal(true);
  };

  const handleSaveExercise = (exerciseData) => {
    if (editingExercise) {
      // Update existing exercise
      deleteExercise(selectedDay, editingExercise.id);
      addExercise(selectedDay, exerciseData);
    } else {
      // Add new exercise
      addExercise(selectedDay, exerciseData);
    }
    setShowModal(false);
    setEditingExercise(null);
  };

  const getCurrentDay = () => {
    const today = new Date();
    const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1; // Convert Sunday=0 to Sunday=6
    return DAYS_OF_WEEK[dayIndex];
  };

  const currentDay = getCurrentDay();

  return (
    <div className="workout-plan">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">
            <Calendar className="inline-block mr-2" size={24} />
            Weekly Workout Plan
          </h1>
          <div className="text-sm text-gray-600">
            Today: <span className="font-semibold text-blue-600">{currentDay}</span>
          </div>
        </div>

        <div className="grid grid-1 gap-6">
          {DAYS_OF_WEEK.map(day => {
            const workout = workoutPlan[day];
            const isToday = day === currentDay;
            
            return (
              <div 
                key={day} 
                className={`workout-day ${isToday ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="workout-day-header">
                  <div>
                    <h3 className={`day-name ${isToday ? 'text-blue-600' : ''}`}>
                      {day}
                      {isToday && <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">Today</span>}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {workout?.name || 'No workout planned'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddExercise(day)}
                    className="btn btn-primary"
                  >
                    <Plus size={16} />
                    Add Exercise
                  </button>
                </div>

                {workout?.exercises?.length > 0 ? (
                  <ul className="exercise-list">
                    {workout.exercises.map(exercise => (
                      <li key={exercise.id} className="exercise-item">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="exercise-name">{exercise.name}</div>
                            <div className="exercise-details">
                              <span>{exercise.sets} sets</span>
                              <span>{exercise.reps} reps</span>
                              <span>{exercise.weight > 0 ? `${exercise.weight} kg` : 'Bodyweight'}</span>
                              <span className="text-blue-600">{exercise.targetMuscle}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditExercise(day, exercise)}
                              className="btn btn-secondary p-2"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => deleteExercise(day, exercise.id)}
                              className="btn btn-danger p-2"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No exercises planned for this day</p>
                    <button
                      onClick={() => handleAddExercise(day)}
                      className="mt-4 btn btn-secondary"
                    >
                      <Plus size={16} />
                      Add First Exercise
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <ExerciseModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveExercise}
          exercise={editingExercise}
          day={selectedDay}
        />
      )}
    </div>
  );
};

export default WorkoutPlan;