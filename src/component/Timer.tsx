import '../styles/Timer.css';
import { FaStop } from 'react-icons/fa';
import { FaPlay } from 'react-icons/fa';
import { RiResetLeftFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { storage } from '../utils/storage.ts';
import TimerForm from './TimerForm.tsx';


export default function Timer() {
  const [timer, setTimer] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(() => {
    return storage.get<number>('timerSeconds') ?? 0;
  });
  const [running, setRunning] = useState<boolean>(() => {
    return storage.get<boolean>('timerPlaying') ?? false;
  });

  const handleTimer = (newValue: number) => {
    setTimer(newValue);
    setSeconds(newValue);
  };

  useEffect(() => {
    storage.set('timerSeconds', seconds);
  }, [seconds]);

  useEffect(() => {
    storage.set('timerPlaying', running);
  }, [running]);


  useEffect(() => {
    if (!seconds || !running) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          alert('Время вышло');
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className={'timer'}>
      <TimerForm handleSubmit={handleTimer} disableSubmit={running} />
      <div>
        <div className={'timer__dial'}>
          {Math.floor(seconds / 60)}:{Number(seconds % 60).toString().padStart(2, '0')}
        </div>
        <div className={'timer__button-group'}>
          <button onClick={() => {
            setRunning(true);
          }}><FaPlay /></button>
          <button onClick={() => {
            setRunning(false);
          }}><FaStop /></button>
          <button onClick={() => {
            storage.remove('timerSeconds');
            storage.remove('timerPlaying');
            setSeconds(timer);
            setRunning(false);
          }}><RiResetLeftFill /></button>
        </div>
      </div>
    </div>
  );
}
