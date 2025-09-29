import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ expiryTimestamp, onExpire }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(expiryTimestamp) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (Object.keys(timeLeft).length === 0 && onExpire) {
      onExpire();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onExpire]);

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !==0) {
      return;
    }
    timerComponents.push(
      <span key={interval}>
        {String(timeLeft[interval]).padStart(2, '0')}
      </span>
    );
  });

  return (
    <div className="text-2xl font-bold text-red-600">
      {timerComponents.length ? 
      (<span>{timerComponents[0]}m : {timerComponents[1]}s</span>) 
      : <span>Time's up!</span>}
    </div>
  );
};

export default CountdownTimer;