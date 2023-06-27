import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Paper from '../assets/images/icon-paper.svg';
import Rock from '../assets/images/icon-rock.svg';
import Scissors from '../assets/images/icon-scissors.svg';
import './arena.css';

const Arena = (props) => {
  const [options, setOptions] = useState([]);
  const [initialState, setInitialState] = useState(true);
  const [actionState, setActionState] = useState(false);
  const [finalState, setFinalState] = useState(false);

  useEffect(()=>{
    if (props.mode === 'normal') {
      setOptions(
        [
          {
            class: 'paper',
            image: Paper
          },
          {
            class: 'rock',
            image: Rock
          },
          {
            class: 'scissors',
            image: Scissors
          }
        ]
      );
    } else {
      setOptions([]);
    }
  }, [props.mode]);

  const Option = (props) => {
    return(
      <motion.div 
        className={props.class + ' option'}
        whileHover={{ rotateZ: 360,
          transition: { type: "spring", bounce: 0.6, duration: 1}}}
        whileTap={{ scale: 0.8 }}>
        <motion.div className="image">
          <motion.img src={props.image} alt="." />
        </motion.div>
      </motion.div>
    );
  }

	return (
		<motion.div className='arena'>
      <AnimatePresence mode='popLayout'>
        { initialState &&
          <motion.div className="initial">
          {
            options.map( option => (
              <Option class={option.class} image={option.image} key={option}/>
            ))
          }
          </motion.div>
        }

        {
          actionState &&
          <motion.div className='action'>

          </motion.div>
        }

        {
          finalState &&
          null
        }
      </AnimatePresence>
		</motion.div>
	);
}
 
export default Arena;