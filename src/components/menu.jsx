import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/images/logo.svg';
import AdvLogo from '../assets/images/logo-bonus.svg';
import closeIcon from "../assets/images/icon-close.svg";
import './menu.css';

const Menu = (props) => {
  const [dispStats, setDispStats] = useState(false);
	const [showFirstHint, setShowFirstHint] = useState(false);
	const [showLastHint, setShowLastHint] = useState(false);

	useEffect(() => {
		if (props.isFirstTime) {
			props.setIsIntro(true);
			setShowFirstHint(true);
		setTimeout(() => {
			setShowFirstHint(false);
			setShowLastHint(true);

			setTimeout(() => {
				setShowLastHint(false);
				props.setIsIntro(false);
			}, 5000);
		}, 5000);
		props.setIsFirstTime(false);
		}
	}, []);

  return ( 
    <motion.div className={props.isIntro ? 'menu no-event' : 'menu'}>
			<motion.img 
        variants={props.variants}
        initial={false}
        animate="reveal"
        exit="hide"
        whileTap={{ scale: 0.9 }}
        onClick={() => props.setGameMode()}
        className='logo' 
        src={props.mode === 'normal' ? Logo : AdvLogo} 
        alt="." />

			<motion.div 
        variants={props.variants}
        initial={false}
        animate="reveal"
        exit="hide"
        whileTap={{ scale: 0.9 }}
        onClick={
          () => {
            setDispStats(prevState => !prevState)
          }
      } 
        className="score-box">
				<motion.p>SCORE</motion.p>
				<motion.div className="score">{props.wins - props.losses}</motion.div>
			</motion.div>

			<motion.div 
        className="stat-box"
        variants={props.variants}
        initial={false}
        animate={dispStats ? "topReveal" : "topHide"}>
				<motion.img 
          onClick={() => setDispStats(false)}
          src={closeIcon} alt="." />
				<motion.div className="score-stats">
					<p>Wins:</p>
          <motion.span className="score">{props.wins}</motion.span>
				</motion.div>
        <motion.div className="score-stats">
					<p>Losses:</p>
          <motion.span className="score">{props.losses}</motion.span>
				</motion.div>
				<motion.div className="score-stats">
					<p>Draws:</p>
          <motion.span className="score">{props.draws}</motion.span>
				</motion.div>
			</motion.div>

			{showFirstHint &&
				<motion.div 
          variants={props.variants}
					initial="hide"
					animate="reveal"
					exit="hide"
          className="hint-one">
				  Click this Image to switch to {props.mode === 'normal' ? 'Advanced' : 'Normal'} Mode
			  </motion.div>
			}
			{showLastHint &&
				<motion.div 
          variants={props.variants}
					initial="hide"
					animate="reveal"
					exit="hide"
          className="hint-two">
				  Click this score box for more stats
			  </motion.div>
			}
    </motion.div>
  );
}

export default Menu;