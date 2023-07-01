# Frontend Mentor - Rock, Paper, Scissors solution

This is a solution to the [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH). 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- Play Rock, Paper, Scissors against the computer
- Maintain the state of the score after refreshing the browser
- **Bonus**: Play Rock, Paper, Scissors, Lizard, Spock against the computer

### Links

- Solution URL: [https://github.com/Lexcodes001/rock-paper-scissors-ext](https://github.com/Lexcodes001/rock-paper-scissors-ext)
- Live Site URL: [https://rock-paper-scissors-lexthedev00.netlify.app](https://rock-paper-scissors-lexthedev00.netlify.app)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Framer Motion](https://framer.com/) - For styles


### What I learned

```jsx
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
```

### Continued development

- React Hooks
- Framer animations

## Author

- Website - pending...
- Frontend Mentor - [@Lexcodes001](https://www.frontendmentor.io/profile/Lexcodes001)
- Twitter - [@adetayoalex00_](https://www.twitter.com/adetayoalex00_)