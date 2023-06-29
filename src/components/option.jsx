import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Paper from '../assets/images/icon-paper.svg';
import Rock from '../assets/images/icon-rock.svg';
import Scissors from '../assets/images/icon-scissors.svg';
import './option.css';

export const GameOption = (props) => {
	return(
		<>
      <motion.div 
        variants={props.variants}
        initial={false}
        animate="reveal"
        exit="hide"
        className={props.id + ' option'}
        whileTap={{ scale: 0.8 }}
        onClick={() => {
          props.dispResult(props.id, props.class, props.image, props.beatenBy)}}>
        <motion.div className="image">
          <motion.img
            whileHover={{ rotateZ: 360,
              transition: { type: "spring", bounce: 0.8, duration: 2}}}
            src={props.image} 
            alt="." />
        </motion.div>
      </motion.div>
    </>
	);
}

const Option = (props) => {
	return(
		<>
      <motion.div 
        variants={props.variants}
        initial="hide"
        animate="reveal"
        exit="hide"
        className={props.id + ' option'}>
        <motion.div className="image">
          <motion.img
            whileHover={{ rotateZ: 360,
              transition: { type: "spring", bounce: 0.8, duration: 2}}}
            src={props.image} 
            alt="." />
        </motion.div>
      </motion.div>
    </>
	);
}

export default Option;