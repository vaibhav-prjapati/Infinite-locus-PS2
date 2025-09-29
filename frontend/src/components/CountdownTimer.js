// src/components/CountdownTimer.js
import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ expiryTimestamp }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(expiryTimestamp) - new Date();
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
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <span key={interval}>
        {String(timeLeft[interval]).padStart(2, '0')}
      </span>
    );
  });

  return (
    <div>
      <h2>Order will auto-cancel in:</h2>
      {timerComponents.length ? 
        <p style={{fontSize: '24px', fontWeight: 'bold'}}>{timeLeft.minutes}:{String(timeLeft.seconds).padStart(2, '0')}</p> 
        : <p style={{color: 'red', fontWeight: 'bold'}}>Order expired and has been cancelled.</p>
      }
    </div>
  );
};

export default CountdownTimer;