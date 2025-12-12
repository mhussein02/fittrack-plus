const STORAGE_KEY = "fittrackplus-data";

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getSampleData() {
  const today = new Date();
  const day = (offset) => {
    const d = new Date(today);
    d.setDate(d.getDate() - offset);
    return formatDate(d);
  };

  return {
    workouts: [
      {
        id: "w1",
        name: "Push Day",
        date: day(1),
        duration: "45 min",
        notes: "Bench Press • Shoulder Press • Triceps Pushdowns",
      },
      {
        id: "w2",
        name: "Leg Day",
        date: day(2),
        duration: "60 min",
        notes: "Squats • Lunges • Leg Press",
      },
      {
        id: "w3",
        name: "Back & Biceps",
        date: day(3),
        duration: "50 min",
        notes: "Rows • Lat Pulldown • Curls",
      },
      {
        id: "w4",
        name: "HIIT Session",
        date: day(4),
        duration: "20 min",
        notes: "Intervals: 40s on / 20s off",
      },
      {
        id: "w5",
        name: "Light Cardio",
        date: day(0),
        duration: "30 min",
        notes: "Treadmill walk, incline 5%",
      },
    ],
    meals: [
      {
        id: "m1",
        name: "Breakfast",
        date: day(0),
        calories: 520,
        notes: "Eggs, oatmeal, berries",
      },
      {
        id: "m2",
        name: "Lunch",
        date: day(0),
        calories: 680,
        notes: "Chicken bowl with rice & veggies",
      },
      {
        id: "m3",
        name: "Dinner",
        date: day(0),
        calories: 760,
        notes: "Salmon, rice, broccoli",
      },
      {
        id: "m4",
        name: "Snack",
        date: day(0),
        calories: 180,
        notes: "Protein shake",
      },
      {
        id: "m5",
        name: "Lunch",
        date: day(1),
        calories: 700,
        notes: "Turkey sandwich & salad",
      },
      {
        id: "m6",
        name: "Dinner",
        date: day(2),
        calories: 800,
        notes: "Pasta with chicken",
      },
      {
        id: "m7",
        name: "Lunch",
        date: day(3),
        calories: 650,
        notes: "Burrito bowl",
      },
      {
        id: "m8",
        name: "Dinner",
        date: day(4),
        calories: 720,
        notes: "Stir fry & rice",
      },
    ],
    goals: [
      {
        id: "g1",
        title: "Run a 5K without stopping",
        targetDate: formatDate(today),
        completed: false,
      },
      {
        id: "g2",
        title: "Hit 10,000 steps daily",
        targetDate: day(7),
        completed: false,
      },
      {
        id: "g3",
        title: "Lift 1.5x bodyweight squat",
        targetDate: day(30),
        completed: false,
      },
    ],
  };
}

function getInitialData() {
  return getSampleData();
}

export function loadData() {
  if (typeof window === "undefined") return getInitialData();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const sample = getInitialData();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
      return sample;
    }
    const data = JSON.parse(raw);
    return {
      workouts: data.workouts || [],
      meals: data.meals || [],
      goals: data.goals || [],
    };
  } catch (e) {
    console.error("Failed to load data", e);
    return getInitialData();
  }
}

function saveAll(data) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveWorkout(workout) {
  const data = loadData();
  const newWorkout = {
    id: Date.now().toString(),
    ...workout,
  };
  data.workouts.push(newWorkout);
  saveAll(data);
  return data.workouts;
}

export function saveMeal(meal) {
  const data = loadData();
  const newMeal = {
    id: Date.now().toString(),
    ...meal,
  };
  data.meals.push(newMeal);
  saveAll(data);
  return data.meals;
}

export function saveGoal(goal) {
  const data = loadData();
  const newGoal = {
    id: Date.now().toString(),
    completed: false,
    ...goal,
  };
  data.goals.push(newGoal);
  saveAll(data);
  return data.goals;
}

export function deleteWorkout(id) {
  const data = loadData();
  data.workouts = data.workouts.filter((w) => w.id !== id);
  saveAll(data);
  return data.workouts;
}

export function deleteMeal(id) {
  const data = loadData();
  data.meals = data.meals.filter((m) => m.id !== id);
  saveAll(data);
  return data.meals;
}

export function toggleGoal(id) {
  const data = loadData();
  data.goals = data.goals.map((g) =>
    g.id === id ? { ...g, completed: !g.completed } : g
  );
  saveAll(data);
  return data.goals;
}
