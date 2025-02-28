import React from 'react';
import MyButton from './components/MyButton';

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-500">
        Hello from React + Tailwind
      </h1>
      <MyButton />
    </div>
  );
}
