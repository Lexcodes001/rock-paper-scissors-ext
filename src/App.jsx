import { useState } from 'react';
import Menu from './components/menu.jsx';
import Arena from './components/arena.jsx';
import Rules from './components/rules.jsx';
import './App.css';

const App = () => {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'normal');
	const [wins, setWins] = useState(Number(localStorage.getItem('wins')) || 0);
	const [losses, setLosses] = useState(Number(localStorage.getItem('losses')) || 0);

  const variants = {
    leftOpened: {
      opacity: 1, x: 0,
      transition: { type: "tween", staggerChildren: 0.07, delayChildren: 0.2 }
    },
    leftClosed: {
      opacity: 0, x: "100%",
      transition: { type: "tween", staggerChildren: 0.05, staggerDirection: -1 }
    },
    topOpened: {
      opacity: 1, x: 0, y: 0, zIndex: 0, scale: 1,
      transition: { type: "spring", bounce: 0.5, staggerChildren: 0.07, delayChildren: 0.2 }
    },
    topClosed: {
      opacity: 0, x: 0, y: "-200%", zIndex: -5, scale: 0,
      transition: { type: "spring", bounce: 0.5, staggerChildren: 0.05, staggerDirection: -1 }
    },
    topReveal: {
      opacity: 1, scaleY: 1,
      transition: { type: "spring", bounce: 0.5, staggerChildren: 0.07, delayChildren: 0.2 }
    },
    topHide: {
      opacity: 0, scaleY: 0,
      transition: { type: "spring", bounce: 0.5, staggerChildren: 0.05, staggerDirection: -1 }
    },
    desktopUsersOpened: {
      opacity: 1, x: -257, y: 48, zIndex: 0, scale: 1,
      transition: { type: "spring", bounce: 0.5, staggerChildren: 0.07, delayChildren: 0.2 }
    },
    desktopUsersClosed: {
      opacity: 0, x: -50, y: "-200%", zIndex: 0, scale: 0.5,
      transition: { type: "spring", bounce: 0.5, staggerChildren: 0.05, staggerDirection: -1 }
    },
    reveal: {
      scale: 1, opacity: 1,
      transition: {
        type: "spring", bounce: 0.5,duration: 1
      }
    },
    hide: {
      scale: 0.5, opacity: 0,
      transition: {
        type: "spring", bounce: 0.5,duration: 1
      }
    }
  };

  const setGameMode = (mode) => {
    if (mode === 'normal') {
      localStorage.setItem('mode', 'adv')
    } else {
      localStorage.setItem('mode', 'normal')
    }
    alert(mode);
    setMode(localStorage.getItem('mode'));
  }

	const setResult = (isWon) => {
    let userWins = wins;
    let userLosses = losses;
		if (isWon) {
      localStorage.setItem('wins', userWins + 1);
			setWins(Number(localStorage.getItem('wins')));
		} else {
      localStorage.setItem('losses', userLosses + 1);
			setLosses(Number(localStorage.getItem('losses')));
		}
	}

  return (
    <div className='app'>
		  <Menu variants={variants} mode={mode} wins={wins} losses={losses} setGameMode={setGameMode}/>
			<Arena variants={variants} mode={mode} setResult={setResult}/>
			<Rules variants={variants} mode={mode}/>
    </div>
  );
}

export default App;