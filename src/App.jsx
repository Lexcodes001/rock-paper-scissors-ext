import { useState } from 'react';
import Menu from './components/menu.jsx';
import Arena from './components/arena.jsx';
import Rules from './components/rules.jsx';
import './App.css';

const App = () => {
  const [mode, setMode] = useState('normal');

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
      scale: 0, opacity: 0,
      transition: {
        type: "spring", bounce: 0.5,duration: 1
      }
    }
  };

  return (
    <div className='app'>
		  <Menu variants={variants} mode={mode}/>
			<Arena variants={variants} mode={mode}/>
			<Rules variants={variants} mode={mode}/>
    </div>
  );
}

export default App;