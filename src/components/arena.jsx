import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Option, { GameOption } from './option';
import Triangle from '../assets/images/bg-triangle.svg';
import Pentagon from '../assets/images/bg-pentagon.svg';
import Paper from '../assets/images/icon-paper.svg';
import Rock from '../assets/images/icon-rock.svg';
import Scissors from '../assets/images/icon-scissors.svg';
import Spock from '../assets/images/icon-spock.svg';
import Lizard from '../assets/images/icon-lizard.svg';
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
			id: 'paper',
			class: "paper",
			image: Paper,
			beatenBy: ["scissors"]
		},
		{
			id: 'rock',
			class: "rock",
			image: Rock,
			beatenBy: ["paper"]
		},
		{
			id: 'scissors',
			class: "scissors",
			image: Scissors,
			beatenBy: ["rock"]
		}
	];

	const advOptions = [
		{
			id: 'paper',
			class: "paper",
			image: Paper,
			beatenBy: ["scissors", "lizard"]
		},
		{
			id: 'rock',
			class: "rock",
			image: Rock,
			beatenBy: ["paper", "spock"]
		},
		{
			id: 'scissors',
			class: "scissors",
			image: Scissors,
			beatenBy: ["rock", "spock"]
		},
		{
			id: 'spock',
			class: "spock",
			image: Spock,
			beatenBy: ["lizard", "paper"]
		},
		{
			id: 'lizard',
			class: "lizard",
			image: Lizard,
			beatenBy: ["rock", "scissors"]
		}
	];

  useEffect(()=>{
    if (props.mode === 'normal') {
      setOptions(normalOptions);
    } else {
      setOptions(advOptions);
    }

		if (props.reset) {
			resetGame();
		}
  }, [props]);

	const dispResult = (id, className, image, beatenBy) => {
		const chosenOption = {
			id: id,
			class: className,
			image: image,
			beatenBy: [...beatenBy]
		};

		setUserOption(chosenOption);
		setInitialState(false);
		setActionState(true);
		let randomIndex = Math.floor(Math.random() * [...options].length);
		let randomTime = Math.floor(Math.random() * 1000);
    let botChoice = options[randomIndex];
		setBotOption(botChoice);
    
		setTimeout(() => {
      if (chosenOption.beatenBy.includes(botChoice.class)) {
        setIsWon(false);
        props.setResult(false);
      } else if (chosenOption.class === botChoice.class) {
				props.setResult(null);
			} else {
        setIsWon(true);
        props.setResult(true);
      }
			setFinalState(true);
		}, randomTime);
	};

  const resetGame = () => {
    setInitialState(true);
    setActionState(false);
    setFinalState(false);
    setUserOption(null);
    setBotOption(null);
    setIsWon(null);
  }

	return (
		<motion.div className={props.isIntro ? 'blur no-event arena' : 'arena'}>
        { (initialState && props.mode === 'normal') &&
          <motion.div 
					variants={variants}
					initial="hide"
					animate="reveal"
					exit="hide"
					className="initial"
					style={{ backgroundImage: props.mode === 'normal' ? `url(${Triangle})` : `url(${Pentagon})` }}>
            <AnimatePresence>
					  {
						normalOptions.map(option => (
							<GameOption 
                variants={variants}
								dispResult={dispResult}
								class={option.class} 
								id={option.class}
								image={option.image} 
                beatenBy={option.beatenBy}
                key={Math.random() * normalOptions.length}/>
						))
          }
          </AnimatePresence>
          </motion.div>
        }

        { (initialState && props.mode === 'adv') &&
          <motion.div 
					variants={variants}
					initial="hide"
					animate="reveal"
					exit="hide"
					className="initial"
					style={{ backgroundImage: props.mode === 'normal' ? `url(${Triangle})` : `url(${Pentagon})` }}>
            <AnimatePresence>
					  {
						advOptions.map(option => (
							<GameOption 
                variants={variants}
								dispResult={dispResult}
								class={option.class} 
								id={option.class + '-adv adv'}
								image={option.image} 
                beatenBy={option.beatenBy}
                key={Math.random() * advOptions.length}/>
						))
          }
          </AnimatePresence>
          </motion.div>
        }

        {
          actionState &&
          <motion.div 
					variants={variants}
					initial="hide"
					animate="reveal"
					exit="hide"
					className='action'>
						<motion.div className={`user selected ${(isWon || (isWon === null)) ? 'rel' : ''}`}>
						  <Option 
              variants={variants}
							class={userOption.class} 
							id={userOption.class}
							image={userOption.image}/>
							<p className='picked'>YOU PICKED</p>
						{ (finalState && (isWon || isWon === null)) &&
						  <>
              <div className="wave one"></div>
							<div className="wave two"></div>
							<div className="wave three"></div>
							<div className="wave four"></div>
              <div className="wave five"></div>
							</>
            }
						</motion.div>

						<motion.div className={`bot selected ${(!isWon || (isWon === null)) ? 'rel' : ''}`}>
						  { finalState ?
							<>
								<Option 
                variants={variants}
								class={botOption.class} 
								id={botOption.class}
								image={botOption.image}/>
								<p className='picked'>GPTBOT PICKED</p>
								{ (finalState && (!isWon || isWon === null)) &&
						      <>
                  <div className="wave one"></div>
							    <div className="wave two"></div>
							    <div className="wave three"></div>
							    <div className="wave four"></div>
                  <div className="wave five"></div>
							    </>
                }
							</> :
							<>
								<div className="loading"></div>
								<p className='loading-txt'>BOT is thinking...</p>
							</>
							}
						</motion.div>

          </motion.div>
        }
        
        { finalState &&
          <motion.div className='afterplay'>
              { isWon !== null ?
							  <div className="result">YOU <span className={isWon ? 'win' : 'lose'}>{isWon ? 'WIN' : "LOSE"}</span></div> :
								<div className="result">IT'S A <span className="draw">DRAW</span></div>
							}
            <button onClick={resetGame}>PLAY AGAIN</button>
          </motion.div>
        }
		</motion.div>
	);
}
 
export default Arena;