import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Paper from '../assets/images/icon-paper.svg';
import Rock from '../assets/images/icon-rock.svg';
import Scissors from '../assets/images/icon-scissors.svg';
import './option.css';

const Option = (props) => {
	const [initialState, setInitialState] = useState(props.initialState);
	const [actionState, setActionState] = useState(props.actionState);
	const [finalState, setFinalState] = useState(props.finalState);

	return(
		<motion.div 
			className={props.class + ' option'}
			whileTap={initialState && { scale: 0.8 }}
			onClick={() => {
				props.callFn && props.dispResult(props.class, props.image, props.beatenBy)}}>
			<motion.div className="image">
				<motion.img
          whileHover={{ rotateZ: 360,
            transition: { type: "spring", bounce: 0.8, duration: 2}}}
          src={props.image} 
          alt="." />
			</motion.div>
		</motion.div>
	);
}

export default Option;