import React, { useState, useMemo } from 'react';
import { useFitness } from '../context/FitnessContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Dumbbell, Clock, Target } from 'lucide-react';

const Analytics = () => {
  const { workoutHistory, getProgressData, getStats } = useFitness();
  const [selectedExercise, setSelectedExercise] = useState('');
  const [timeRange, setTimeRange] = useState('30'); // days

  const stats = getStats();
  const progressData = getProgressData();

  const filteredHistory = useMemo(() => {
    const days = parseInt(timeRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return workoutHistory.filter(workout => 
      new Date(workout.date) >= cutoffDate
    );
  }, [workoutHistory, timeRange]);

  const exerciseOptions = Object.keys(progressData);

  const selectedExerciseData = useMemo(() => {
    if (!selectedExercise || !progressData[selectedExercise]) return [];
    
    return progressData[selectedExercise]
      .filter(entry => {
        const days = parseInt(timeRange);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        return new Date(entry.date) >= cutoffDate;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(entry => ({
        ...entry,
        date: new Date(entry.date).toLocaleDateString()
      }));
  }, [selectedExercise, progressData, timeRange]);

  const workoutFrequencyData = useMemo(() => {
    const frequency = {};
    filteredHistory.forEach(workout => {
      const week = getWeekNumber(new Date(workout.date));
      frequency[week] = (frequency[week] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .map(([week, count]) => ({ week: `Week ${week}`, workouts: count }))
      .sort((a, b) => a.week.localeCompare(b.week));
  }, [filteredHistory]);

  const muscleGroupData = useMemo(() => {
    const muscleGroups = {};
    filteredHistory.forEach(workout => {
      workout.exercises.forEach(exercise => {
        muscleGroups[exercise.targetMuscle] = (muscleGroups[exercise.targetMuscle] || 0) + 1;
      });
    });
    
    return Object.entries(muscleGroups).map(([muscle, count]) => ({
      name: muscle,
      exercises: count
    }));
  }, [filteredHistory]);

  const volumeProgressData = useMemo(() => {
    const volumeByWeek = {};
    
    filteredHistory.forEach(workout => {
      const week = getWeekNumber(new Date(workout.date));
      if (!volumeByWeek[week]) volumeByWeek[week] = 0;
      
      workout.exercises.forEach(exercise => {
        volumeByWeek[week] += exercise.weight * exercise.reps * (exercise.completedSets || exercise.sets);
      });
    });
    
    return Object.entries(volumeByWeek)
      .map(([week, volume]) => ({ 
        week: `Week ${week}`, 
        volume: Math.round(volume) 
      }))
      .sort((a, b) => a.week.localeCompare(b.week));
  }, [filteredHistory]);

  function getWeekNumber(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  }

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];

  return (
    <div className="analytics">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">
            <TrendingUp className="inline-block mr-2" size={24} />
            Fitness Analytics
          </h1>
          <div className="flex gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="form-select"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-4 mb-8">
          <div className="stat-card">
            <div className="stat-value">{stats.totalWorkouts}</div>
            <div className="stat-label">
              <Calendar size={16} className="inline-block mr-1" />
              Total Workouts
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.thisWeekWorkouts}</div>
            <div className="stat-label">
              <Target size={16} className="inline-block mr-1" />
              This Week
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.totalExercises}</div>
            <div className="stat-label">
              <Dumbbell size={16} className="inline-block mr-1" />
              Total Exercises
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.avgDuration}m</div>
            <div className="stat-label">
              <Clock size={16} className="inline-block mr-1" />
              Avg Duration
            </div>
          </div>
        </div>

        <div className="grid grid-2 gap-6">
          {/* Exercise Progress Chart */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Exercise Progress</h3>
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="form-select"
              >
                <option value="">Select an exercise</option>
                {exerciseOptions.map(exercise => (
                  <option key={exercise} value={exercise}>{exercise}</option>
                ))}
              </select>
            </div>
            
            {selectedExerciseData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={selectedExerciseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#667eea" 
                    strokeWidth={3}
                    name="Weight (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                {selectedExercise ? 'No data available for selected timeframe' : 'Select an exercise to view progress'}
              </div>
            )}
          </div>

          {/* Workout Frequency */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Workout Frequency</h3>
            </div>
            
            {workoutFrequencyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutFrequencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="workouts" fill="#667eea" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No workout data available for selected timeframe
              </div>
            )}
          </div>

          {/* Training Volume */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Training Volume</h3>
              <div className="text-sm text-gray-600">Weight × Reps × Sets</div>
            </div>
            
            {volumeProgressData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={volumeProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} kg`, 'Volume']} />
                  <Line 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#764ba2" 
                    strokeWidth={3}
                    fill="#764ba2"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No volume data available for selected timeframe
              </div>
            )}
          </div>

          {/* Muscle Group Distribution */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Muscle Group Focus</h3>
            </div>
            
            {muscleGroupData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={muscleGroupData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="exercises"
                  >
                    {muscleGroupData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No muscle group data available for selected timeframe
              </div>
            )}
          </div>
        </div>

        {/* Recent Workouts */}
        <div className="card mt-6">
          <div className="card-header">
            <h3 className="card-title">Recent Workouts</h3>
          </div>
          
          {filteredHistory.length > 0 ? (
            <div className="space-y-4">
              {filteredHistory.slice(0, 5).map(workout => (
                <div key={workout.id} className="exercise-item">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="exercise-name">{workout.workoutName}</div>
                      <div className="exercise-details">
                        <span>{new Date(workout.date).toLocaleDateString()}</span>
                        <span>{workout.dayName}</span>
                        <span>{workout.exercises.length} exercises</span>
                        <span>{workout.duration}min</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        Total Volume: {Math.round(
                          workout.exercises.reduce((sum, ex) => 
                            sum + (ex.weight * ex.reps * (ex.completedSets || ex.sets)), 0
                          )
                        )} kg
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent workouts found for the selected timeframe
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;