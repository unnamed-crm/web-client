import { useState, useRef } from 'react';

const getTime = (ms: number) => {
  const totalSecs = Math.ceil(ms / 1000);

  const mins = Math.floor((totalSecs % (60 * 60)) / 60);
  const secs = Math.floor(totalSecs % 60);

  return {
    secs,
    mins,
  };
};

const getRemainingTime = (ms: number) => {
  const now = new Date().getTime();
  const msDiff = ms - now;
  if (msDiff > 0) return msDiff;
  return 0;
};

const getTargetTime = (value: number) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + value);
  return now.getTime();
};

interface UseTimerProps {
  expiredTime: number;
}

export const useTimer = ({ expiredTime }: UseTimerProps) => {
  const timerRef = useRef<any>();
  let targetTime = getTargetTime(expiredTime);
  const [remainingTime, setRemainingTime] = useState<number>(() => getRemainingTime(targetTime));
  const [isStart, setIsStart] = useState<boolean>(false);
  const [isOver, setIsOver] = useState<boolean>(false);

  const timer = () => {
    const value = getRemainingTime(targetTime);
    setRemainingTime(value);
    if (value <= 0) {
      setIsStart(false);
      setIsOver(true);
      clearInterval(timerRef.current);
    }
  };

  const start = () => {
    if (!isStart && !timerRef.current) {
      timerRef.current = setInterval(timer, 1000);
      setIsStart(true);
      setIsOver(false);
    }
  };

  const restart = () => {
    clearInterval(timerRef.current);
    const newTargetTime = getTargetTime(expiredTime);
    targetTime = newTargetTime;
    setRemainingTime(getRemainingTime(newTargetTime));
    timerRef.current = setInterval(timer, 1000);
    setIsStart(true);
    setIsOver(false);
  };

  return { ...getTime(remainingTime), start, restart, isOver };
};
