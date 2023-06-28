import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Option from './option';
import Paper from '../assets/images/icon-paper.svg';
import Rock from '../assets/images/icon-rock.svg';
import Scissors from '../assets/images/icon-scissors.svg';
import './arena.css';

const Arena = (props) => {
  const [options, setOptions] = useState([]);
  const [initialState, setInitialState] = useState(true);
  const [actionState, setActionState] = useState(false);
  const [finalState, setFinalState] = useState(false);
	const [userOption, setUserOption] = useState(null);
	const [botOption, setBotOption] = useState(null);
	const [isWon, setIsWon] = useState(null);
	const variants = props.variants;
	const normalOptions = [
		{
			class: "paper",
			image: Paper,
			beatenBy: "scissors"
		},
		{
			class: "rock",
			image: Rock,
			beatenBy: "paper"
		},
		{
			class: "scissors",
			image: Scissors,
			beatenBy: "rock"
		}
	];

  useEffect(()=>{
    if (props.mode === 'normal') {
      setOptions(normalOptions);
    } else {
      setOptions([]);
    }
  }, [props.mode]);

	const dispResult = (className, image, beatenBy) => {
		const chosenOption = {
			class: className,
			image: image,
			beatenBy: beatenBy
		};

		setUserOption(chosenOption);
		setInitialState(false);
		setActionState(true);
		let botOptions = normalOptions.filter(option => option.class !== chosenOption.class);
		let randomIndex = Math.floor(Math.random() * botOptions.length);
		let randomTime = Math.floor(Math.random() * 10000);
		setBotOption(botOptions[randomIndex]);

		if (chosenOption.beatenBy === botOption.class) {
			setIsWon(false);
			props.setResult(false);
		} else {
			setIsWon(true);
			props.setResult(true);
		}

		setTimeout(() => {
			setFinalState(true)
		}, randomTime);
	};

	return (
		<motion.div className='arena'>
      <AnimatePresence mode='popLayout'>
        { initialState ?
          <motion.div 
					variants={variants}
					initial="hide"
					animate="reveal"
					exit="hide"
					className="initial"
					>
					  {normalOptions.map(option => (
							<Option 
								initialState={initialState}
								actionState={actionState}
								finalState={finalState}
								callFn={true}
								dispResult={dispResult}
								class={option.class} 
								image={option.image} />
						))}
          </motion.div> : null
        }

        {
          actionState &&
          <motion.div 
					variants={variants}
					initial="hide"
					animate="reveal"
					exit="hide"
					className='action'>
						<motion.div className="user selected">
						  <Option 
							class={userOption.class} 
							image={userOption.image}
							initialState={initialState}
							actionState={actionState}
							finalState={finalState}
							callFn={false}/>
							<p>YOU PICKED</p>
						{ finalState &&
						  <>
              <div className="wave one"></div>
							<div className="wave two"></div>
							<div className="wave three"></div>
							<div className="wave four"></div>
							</>
            }
						</motion.div>

						<motion.div className="bot selected">
						  { finalState ?
							<>
								<Option 
								class={botOption.class} 
								image={botOption.image}
								initialState={initialState}
								actionState={actionState}
							  finalState={finalState}
							  callFn={false}/>
								<p>GAME BOT PICKED</p>
							</> :
							<>
								<div className="loading"></div>
								<p className='loading-txt'>BOT is thinking...</p>
							</>
							}
						</motion.div>

						{ finalState &&
							<motion.div className='afterplay'>
								<div className="result">
									YOU <span className={isWon ? 'win' : 'lose'}>{ isWon ? 'WIN' : "LOSE" }</span>
								</div>
								<button className="reset">PLAY AGAIN</button>
							</motion.div>
						}
          </motion.div>
        }
      </AnimatePresence>
		</motion.div>
	);
}
 
export default Arena;