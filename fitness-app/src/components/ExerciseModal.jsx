import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ExerciseModal = ({ isOpen, onClose, onSave, exercise, day }) => {
  const [formData, setFormData] = useState({
    name: '',
    sets: 3,
    reps: 10,
    weight: 0,
    targetMuscle: 'Chest'
  });

  useEffect(() => {
    if (exercise) {
      setFormData(exercise);
    } else {
      setFormData({
        name: '',
        sets: 3,
        reps: 10,
        weight: 0,
        targetMuscle: 'Chest'
      });
    }
  }, [exercise]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const muscleGroups = [
    'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Core', 'Cardio'
  ];

  const commonExercises = {
    Chest: ['Bench Press', 'Incline Dumbbell Press', 'Push-ups', 'Chest Flyes', 'Dips'],
    Back: ['Deadlift', 'Pull-ups', 'Barbell Rows', 'Lat Pulldowns', 'T-Bar Rows'],
    Shoulders: ['Overhead Press', 'Lateral Raises', 'Front Raises', 'Rear Delt Flyes', 'Shrugs'],
    Biceps: ['Bicep Curls', 'Hammer Curls', 'Preacher Curls', 'Cable Curls', 'Chin-ups'],
    Triceps: ['Tricep Dips', 'Close-Grip Bench Press', 'Tricep Extensions', 'Diamond Push-ups', 'Overhead Tricep Press'],
    Legs: ['Squats', 'Romanian Deadlift', 'Leg Press', 'Lunges', 'Calf Raises', 'Leg Curls'],
    Core: ['Plank', 'Russian Twists', 'Bicycle Crunches', 'Mountain Climbers', 'Dead Bug'],
    Cardio: ['Treadmill', 'Cycling', 'Rowing', 'Elliptical', 'HIIT']
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {exercise ? 'Edit Exercise' : `Add Exercise to ${day}`}
          </h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Target Muscle Group</label>
            <select
              name="targetMuscle"
              value={formData.targetMuscle}
              onChange={handleChange}
              className="form-select"
              required
            >
              {muscleGroups.map(muscle => (
                <option key={muscle} value={muscle}>{muscle}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Exercise Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter exercise name or select from suggestions"
              list="exercise-suggestions"
              required
            />
            <datalist id="exercise-suggestions">
              {commonExercises[formData.targetMuscle]?.map(exerciseName => (
                <option key={exerciseName} value={exerciseName} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-3">
            <div className="form-group">
              <label className="form-label">Sets</label>
              <input
                type="number"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                className="form-input"
                min="1"
                max="10"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Reps</label>
              <input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                className="form-input"
                min="1"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="form-input"
                min="0"
                step="0.5"
                placeholder="0 for bodyweight"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="btn btn-primary flex-1"
            >
              {exercise ? 'Update Exercise' : 'Add Exercise'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExerciseModal;