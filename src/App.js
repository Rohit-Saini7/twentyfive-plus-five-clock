import React, { useEffect, useState } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [alarmColor, setAlarmColor] = useState({ color: 'white' });
  const [timerType, setTimerType] = useState('Session');
  const [timerState, setTimerState] = useState('pause');
  const [timer, setTimer] = useState(1500);

  useEffect(() => {
    if (timerState === 'play') {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timerState, timer]);

  const controlTimer = () => {
    timerState === 'pause' ? setTimerState('play') : setTimerState('pause');
  };

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setAlarmColor({ color: 'white' });
    setTimerType('Session');
    setTimerState('pause');
    setTimer(1500);
  };

  const clockify = () => {
    if (timer < 0) return '00:00';
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  };

  return (
    <div>
      <div className='main-title'>
        {sessionLength} + {breakLength} Clock
      </div>
      <TimerLengthControl
        addID='break-increment'
        length={breakLength}
        lengthID='break-length'
        minID='break-decrement'
        onClick1={() => setBreakLength((prev) => prev - 1)}
        title='Break Length'
        titleID='break-label'
        onClick2={() => setBreakLength((prev) => prev + 1)}
      />
      <TimerLengthControl
        addID='session-increment'
        length={sessionLength}
        lengthID='session-length'
        minID='session-decrement'
        onClick1={() => setSessionLength((prev) => prev - 1)}
        title='Session Length'
        titleID='session-label'
        onClick2={() => setSessionLength((prev) => prev + 1)}
      />
      <div className='timer' style={alarmColor}>
        <div className='timer-wrapper'>
          <div id='timer-label'>{timerType}</div>
          <div id='time-left'>{clockify()}</div>
        </div>
      </div>
      <div className='timer-control'>
        <button id='start_stop' onClick={controlTimer}>
          {timerState === 'pause' ? (
            <i className='fa fa-play fa-2x' title='play' />
          ) : (
            <i className='fa fa-pause fa-2x' title='pause' />
          )}
        </button>
        <button id='reset' onClick={resetTimer}>
          <i className='fa fa-refresh fa-2x' title='reset' />
        </button>
      </div>
      {/* <audio
          id='beep'
          preload='auto'
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
        />
        */}
    </div>
  );
}

export default App;

const TimerLengthControl = ({
  titleID,
  title,
  minID,
  onClick1,
  lengthID,
  length,
  addID,
  onClick2,
}) => {
  return (
    <div className='length-control'>
      <div id={titleID}>{title}</div>
      <button className='btn-level' id={minID} onClick={onClick1} value='-'>
        <i className='fa fa-arrow-down fa-2x' title='Dec' />
      </button>
      <div className='btn-level' id={lengthID}>
        {length}
      </div>
      <button className='btn-level' id={addID} onClick={onClick2} value='+'>
        <i className='fa fa-arrow-up fa-2x' title='Inc' />
      </button>
    </div>
  );
};
