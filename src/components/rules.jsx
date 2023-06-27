import React, {useState} from 'react';
import { motion } from 'framer-motion';
import closeIcon from "../assets/images/icon-close.svg";
import rulesIcon from "../assets/images/image-rules.svg";
import './rules.css';

const Rules = (props) => {
  const [dispState, setDispState] = useState(false);

	return (
		<motion.div className='rule-box'>
		  <motion.button
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
				<motion.img 
        className='rules-icon'
        src={rulesIcon} alt="." />
			</motion.div>
		</motion.div>
	 );
}
 
export default Rules;