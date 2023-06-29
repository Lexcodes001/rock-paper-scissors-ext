import React, {useState} from 'react';
import { motion } from 'framer-motion';
import closeIcon from "../assets/images/icon-close.svg";
import rulesImg from "../assets/images/image-rules.svg";
import advRulesImg from "../assets/images/image-rules-bonus.svg";
import './rules.css';

const Rules = (props) => {
  const [dispState, setDispState] = useState(false);

	return (
		<motion.div className={props.isIntro ? 'blur no-event rule-box' : 'rule-box'}>
		  <motion.button
			  className={props.isIntro ? 'blur' : ''}
        animate={{ x: "-50%" }}
        whileTap={{ scale: 0.7 }}
			  onClick={() => setDispState(prevstate => !prevstate)}>
        RULES
      </motion.button>

		  <motion.div
        variants={props.variants}
        initial={false}
        animate={dispState ? "topReveal" : "topHide"}
        className="rules">
				<motion.p>RULES</motion.p>
				<motion.img
          onClick={() => setDispState(false)}
          className='close-icon'
          src={closeIcon} alt="." />
				{props.mode === 'normal' ?
				<motion.img 
          className='rules-icon'
          src={rulesImg} alt="." /> :
			  <motion.img 
          className='rules-icon'
          src={advRulesImg} alt="." />
				}
			</motion.div>
		</motion.div>
	 );
}
 
export default Rules;