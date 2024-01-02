import React from "react";

const colors = [
  // {
  //   bg: "bg-gray-50",
  //   text: "text-gray-600",
  //   ring: "ring-gray-500/10",
  // },
  {
    bg: "bg-red-50",
    text: "text-red-700",
    ring: "ring-red-600/10",
  },
  {
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    ring: "ring-yellow-600/20",
  },
  {
    bg: "bg-green-50",
    text: "text-green-700",
    ring: "ring-green-600/20",
  },
  {
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-700/10",
  },
  {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    ring: "ring-indigo-700/10",
  },
  {
    bg: "bg-purple-50",
    text: "text-purple-700",
    ring: "ring-purple-700/10",
  },
  {
    bg: "bg-pink-50",
    text: "text-pink-700",
    ring: "ring-pink-700/10",
  },
];

const Badge = ({ text, cls }: { text: string; cls?: string }) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <span
      className={`${cls} font-medium ring-1 ring-inset ${randomColor.bg} ${randomColor.text} ${randomColor.ring}`}
    >
      {text}
    </span>
  );
};

export default Badge;
