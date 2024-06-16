import { useEffect, useState } from "react";

const Counter = ({ targetNumber, title }: { targetNumber: number; title?: string }) => {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (targetNumber <= 0) return;

    const increment = targetNumber / 100; // Adjust this value to control speed
    const interval = setInterval(() => {
      setCurrentNumber((prevNumber) => {
        const nextNumber = prevNumber + increment;
        if (nextNumber >= targetNumber) {
          clearInterval(interval);
          return targetNumber;
        }
        return nextNumber;
      });
    }, 10); // Adjust this value to control speed

    return () => clearInterval(interval);
  }, [targetNumber]);

  return (
    <div className="border flex-1 rounded-lg p-2 shadow-inner bg-gradient-to-br from-skyBlue to-oceanBlue">
      <div className="flex flex-col justify-center items-center">
        {title && <h4>{title}</h4>}
        <p className="text-5xl font-bold">{Math.floor(currentNumber)}</p>
      </div>
    </div>
  );
};

export default Counter;
