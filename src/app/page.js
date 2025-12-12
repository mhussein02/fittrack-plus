"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import WorkoutsPage from "@/components/WorkoutsPage";
import MealsPage from "@/components/MealsPage";
import GoalsPage from "@/components/GoalsPage";
import ProfilePage from "@/components/ProfilePage";
import {
  loadData,
  saveWorkout,
  saveMeal,
  saveGoal,
  deleteWorkout,
  deleteMeal,
  toggleGoal,
} from "@/lib/storage";

export default function Home() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);
  const [goals, setGoals] = useState([]);
  const [user] = useState({
    name: "Guest",
    email: "user@example.com",
    dailyCalorieGoal: 2000,
  });
  const [authChecked, setAuthChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const logged = window.localStorage.getItem("fittrackplus-loggedin") === "true";
    if (!logged) {
      router.replace("/login");
      return;
    }
    const data = loadData();
    setWorkouts(data.workouts);
    setMeals(data.meals);
    setGoals(data.goals);
    setAuthed(true);
    setAuthChecked(true);
  }, [router]);

  const handleAddWorkout = (workout) => {
    const updated = saveWorkout(workout);
    setWorkouts(updated);
  };

  const handleAddMeal = (meal) => {
    const updated = saveMeal(meal);
    setMeals(updated);
  };

  const handleAddGoal = (goal) => {
    const updated = saveGoal(goal);
    setGoals(updated);
  };

  const handleDeleteWorkout = (id) => {
    const updated = deleteWorkout(id);
    setWorkouts(updated);
  };

  const handleDeleteMeal = (id) => {
    const updated = deleteMeal(id);
    setMeals(updated);
  };

  const handleToggleGoal = (id) => {
    const updated = toggleGoal(id);
    setGoals(updated);
  };

  const getWeeklyData = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekData = days.map((day) => ({ day, calories: 0, workouts: 0 }));

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    meals.forEach((meal) => {
      const mealDate = new Date(meal.date);
      if (mealDate >= weekAgo) {
        const dayIndex = mealDate.getDay();
        weekData[dayIndex].calories += meal.calories;
      }
    });

    workouts.forEach((workout) => {
      const workoutDate = new Date(workout.date);
      if (workoutDate >= weekAgo) {
        const dayIndex = workoutDate.getDay();
        weekData[dayIndex].workouts += 1;
      }
    });

    return weekData;
  };

  const getTodayCalories = () => {
    const today = new Date().toDateString();
    return meals
      .filter((m) => new Date(m.date).toDateString() === today)
      .reduce((sum, m) => sum + m.calories, 0);
  };

  const getTodayWorkouts = () => {
    const today = new Date().toDateString();
    return workouts.filter(
      (w) => new Date(w.date).toDateString() === today
    ).length;
  };

  if (!authChecked && !authed) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Loading...
      </div>
    );
  }

  if (!authed) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        {currentPage === "dashboard" && (
          <Dashboard
            workouts={workouts}
            meals={meals}
            goals={goals}
            user={user}
            weeklyData={getWeeklyData()}
            todayCalories={getTodayCalories()}
            todayWorkouts={getTodayWorkouts()}
          />
        )}

        {currentPage === "workouts" && (
          <WorkoutsPage
            workouts={workouts}
            addWorkout={handleAddWorkout}
            deleteWorkout={handleDeleteWorkout}
          />
        )}

        {currentPage === "meals" && (
          <MealsPage
            meals={meals}
            addMeal={handleAddMeal}
            deleteMeal={handleDeleteMeal}
            user={user}
            todayCalories={getTodayCalories()}
          />
        )}

        {currentPage === "goals" && (
          <GoalsPage
            goals={goals}
            addGoal={handleAddGoal}
            toggleGoal={handleToggleGoal}
          />
        )}

        {currentPage === "profile" && <ProfilePage user={user} />}
      </main>
    </div>
  );
}
