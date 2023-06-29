import { useState } from 'react';
import Menu from './components/menu.jsx';
import Arena from './components/arena.jsx';
import Rules from './components/rules.jsx';
import './App.css';

const App = () => {
  const [mode, setMode] = useState(localStorage.getItem('mode') || 'normal');
	const [isFirstTime, setIsFirstTime] = useState(true);
	const [isIntro, setIsIntro] = useState(true);
	const [wins, setWins] = useState(Number(localStorage.getItem('wins')) || 0);
	const [draws, setDraws] = useState(Number(localStorage.getItem('draws')) || 0);
	const [losses, setLosses] = useState(Number(localStorage.getItem('losses')) || 0);
	const [isReset, setIsReset] = useState(false);


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

  const setGameMode = () => {
    if (mode === 'normal') {
			setIsReset(true);
      localStorage.setItem('mode', 'adv')
    } else {
			setIsReset(true);
      localStorage.setItem('mode', 'normal')
    }
		setTimeout(() => {
			setIsReset(false);
		}, 2000);
    setMode(localStorage.getItem('mode'));
  }

	const setResult = (isWon) => {
    let userWins = wins;
    let userLosses = losses;
		let userDraws = draws;
		if (isWon) {
      localStorage.setItem('wins', userWins + 1);
			setWins(Number(localStorage.getItem('wins')));
		} else if (isWon === null){
      localStorage.setItem('draws', userDraws + 1);
			setDraws(Number(localStorage.getItem('draws')));
		} else {
      localStorage.setItem('losses', userLosses + 1);
			setLosses(Number(localStorage.getItem('losses')));
		}
	}

  return (
    <div className='app'>
		  <Menu variants={variants} mode={mode} wins={wins} losses={losses} draws={draws} setGameMode={setGameMode} isIntro={isIntro} setIsIntro={(arg)=>setIsIntro(arg)} isFirstTime={isFirstTime} setIsFirstTime={(arg)=>setIsFirstTime(arg)} />
			<Arena variants={variants} mode={mode} setResult={setResult} reset={isReset} isIntro={isIntro}/>
			<Rules variants={variants} mode={mode} isIntro={isIntro}/>
    </div>
  );
}

export default App;