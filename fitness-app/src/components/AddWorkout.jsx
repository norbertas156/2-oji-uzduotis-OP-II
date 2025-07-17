import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { Plus, Minus, Save, Calendar } from 'lucide-react';

const AddWorkout = () => {
  const { workoutPlan, DAYS_OF_WEEK, addWorkoutSession } = useFitness();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState(60);
  const [exercises, setExercises] = useState([]);
  const [isCustomWorkout, setIsCustomWorkout] = useState(false);

  React.useEffect(() => {
    if (!isCustomWorkout && selectedDay && workoutPlan[selectedDay]) {
      setWorkoutName(workoutPlan[selectedDay].name || '');
      setExercises(
        workoutPlan[selectedDay].exercises?.map(ex => ({
          ...ex,
          actualWeight: ex.weight,
          actualReps: ex.reps,
          actualSets: ex.sets,
          completedSets: ex.sets
        })) || []
      );
    } else if (isCustomWorkout) {
      setWorkoutName('');
      setExercises([]);
    }
  }, [selectedDay, workoutPlan, isCustomWorkout]);

  const addCustomExercise = () => {
    const newExercise = {
      id: Date.now(),
      name: '',
      targetMuscle: 'Chest',
      actualWeight: 0,
      actualReps: 10,
      actualSets: 3,
      completedSets: 3
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (index, field, value) => {
    const updated = exercises.map((ex, i) => 
      i === index ? { ...ex, [field]: value } : ex
    );
    setExercises(updated);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validExercises = exercises.filter(ex => ex.name.trim());
    
    if (validExercises.length === 0) {
      alert('Please add at least one exercise');
      return;
    }

    const workoutData = {
      dayName: selectedDay,
      workoutName: workoutName || `${selectedDay} Workout`,
      exercises: validExercises.map(ex => ({
        name: ex.name,
        targetMuscle: ex.targetMuscle,
        weight: ex.actualWeight,
        reps: ex.actualReps,
        sets: ex.actualSets,
        completedSets: ex.completedSets
      })),
      duration
    };

    addWorkoutSession(workoutData);
    
    // Reset form
    setWorkoutName('');
    setExercises([]);
    setDuration(60);
    
    alert('Workout logged successfully!');
  };

  const getCurrentDay = () => {
    const today = new Date();
    const dayIndex = today.getDay() === 0 ? 6 : today.getDay() - 1;
    return DAYS_OF_WEEK[dayIndex];
  };

  return (
    <div className="add-workout">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">
            <Calendar className="inline-block mr-2" size={24} />
            Log Workout
          </h1>
          <div className="text-sm text-gray-600">
            Track your completed exercises
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-2 mb-6">
            <div className="form-group">
              <label className="form-label">Workout Day</label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="form-select"
              >
                {DAYS_OF_WEEK.map(day => (
                  <option key={day} value={day}>
                    {day} {day === getCurrentDay() && '(Today)'}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="form-input"
                min="5"
                max="300"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!isCustomWorkout}
                  onChange={() => setIsCustomWorkout(false)}
                />
                Use planned workout
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={isCustomWorkout}
                  onChange={() => setIsCustomWorkout(true)}
                />
                Create custom workout
              </label>
            </div>
          </div>

          {isCustomWorkout && (
            <div className="form-group">
              <label className="form-label">Workout Name</label>
              <input
                type="text"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="form-input"
                placeholder="Enter workout name"
                required
              />
            </div>
          )}

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Exercises</h3>
              {isCustomWorkout && (
                <button
                  type="button"
                  onClick={addCustomExercise}
                  className="btn btn-primary"
                >
                  <Plus size={16} />
                  Add Exercise
                </button>
              )}
            </div>

            {exercises.length > 0 ? (
              <div className="space-y-4">
                {exercises.map((exercise, index) => (
                  <div key={exercise.id || index} className="exercise-item">
                    <div className="grid grid-2 gap-4 mb-4">
                      {isCustomWorkout ? (
                        <>
                          <div className="form-group">
                            <label className="form-label">Exercise Name</label>
                            <input
                              type="text"
                              value={exercise.name}
                              onChange={(e) => updateExercise(index, 'name', e.target.value)}
                              className="form-input"
                              placeholder="Enter exercise name"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Target Muscle</label>
                            <select
                              value={exercise.targetMuscle}
                              onChange={(e) => updateExercise(index, 'targetMuscle', e.target.value)}
                              className="form-select"
                            >
                              {['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Core', 'Cardio'].map(muscle => (
                                <option key={muscle} value={muscle}>{muscle}</option>
                              ))}
                            </select>
                          </div>
                        </>
                      ) : (
                        <div className="col-span-2">
                          <h4 className="font-semibold text-lg">{exercise.name}</h4>
                          <p className="text-gray-600">{exercise.targetMuscle}</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-4 gap-4">
                      <div className="form-group">
                        <label className="form-label">Weight (kg)</label>
                        <input
                          type="number"
                          value={exercise.actualWeight}
                          onChange={(e) => updateExercise(index, 'actualWeight', Number(e.target.value))}
                          className="form-input"
                          min="0"
                          step="0.5"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Reps</label>
                        <input
                          type="number"
                          value={exercise.actualReps}
                          onChange={(e) => updateExercise(index, 'actualReps', Number(e.target.value))}
                          className="form-input"
                          min="1"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Planned Sets</label>
                        <input
                          type="number"
                          value={exercise.actualSets}
                          onChange={(e) => updateExercise(index, 'actualSets', Number(e.target.value))}
                          className="form-input"
                          min="1"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Completed Sets</label>
                        <input
                          type="number"
                          value={exercise.completedSets}
                          onChange={(e) => updateExercise(index, 'completedSets', Number(e.target.value))}
                          className="form-input"
                          min="0"
                          max={exercise.actualSets}
                        />
                      </div>
                    </div>

                    {isCustomWorkout && (
                      <div className="mt-4 text-right">
                        <button
                          type="button"
                          onClick={() => removeExercise(index)}
                          className="btn btn-danger"
                        >
                          <Minus size={16} />
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {isCustomWorkout ? (
                  <>
                    <p>No exercises added yet</p>
                    <button
                      type="button"
                      onClick={addCustomExercise}
                      className="mt-4 btn btn-secondary"
                    >
                      <Plus size={16} />
                      Add First Exercise
                    </button>
                  </>
                ) : (
                  <p>No planned workout for {selectedDay}</p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={exercises.length === 0}
            >
              <Save size={16} />
              Save Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkout;