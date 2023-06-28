import React, {useState} from 'react';
import { motion } from 'framer-motion';
import Logo from '../assets/images/logo.svg';
import closeIcon from "../assets/images/icon-close.svg";
import './menu.css';

const Menu = (props) => {
  const [dispStats, setDispStats] = useState(false);

  return ( 
    <motion.div className="menu">
			<motion.img 
        onClick={() => props.setGameMode()}
        className='logo' 
        src={Logo} 
        alt="." />

			<motion.div 
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
			</motion.div>
    </motion.div>
  );
}

export default Menu;