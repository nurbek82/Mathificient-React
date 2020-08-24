import React,{useState} from 'react'
import Score from './Score';	
import Timer from './Timer';	
import Equation from './Equation';	
import NumberButton from './NumberButton';	
import ClearButton from './ClearButton';
import './Game.css';	
import {randInt} from '../helpers/helpers';

function Game({operation,maxNumber}) {
  let randNums = getRandNumbers(operation, 0, maxNumber);
  const [operands, setOperands] = useState(randNums);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const gameLength = 60;
  const [timeLeft, setTimeLeft] = useState(gameLength);
  const [answered,setAnswered] =  useState(false);
  
  const question = operands.num1 + " " + operation + " " + operands.num2;
  
  function appendToAnswer(num) {
    setUserAnswer(String(Number(userAnswer + num)));
  }
  
  function getRandNumbers(operator, low, high) {
    let num1 = randInt(low, high);
    let num2 = randInt(low, high);
    const numHigh = Math.max(num1, num2);
    const numLow = Math.min(num1, num2);
    if(operator === '-') { // Make sure higher num comes first
      num1 = numHigh;
      num2 = numLow;
    }
    if(operator === '/') {
      if (num2 === 0) { // No division by zero
        num2 = randInt(1, high);
      }
      num1 = (num1 * num2); // product
    }
    return {num1, num2};
  }
  
  function checkAnswer(userAnswer) {
    if (isNaN(userAnswer)) return false; // User hasn't answered
    let correctAnswer;
    switch(operation) {
      case '+':
        correctAnswer = operands.num1 + operands.num2;
        break;
        case '-':
          correctAnswer = operands.num1 - operands.num2;
          break;
          case 'x':
            correctAnswer = operands.num1 * operands.num2;
            break;
            default: // division
            correctAnswer = operands.num1 / operands.num2;
          }
          return (parseInt(userAnswer) === correctAnswer);
        }
        if(!answered && checkAnswer(userAnswer)) {
          setAnswered(true);
          setScore(score + 1);
          setTimeout(newQuestion,300);
        }
        
        function newQuestion() {
          setUserAnswer('');
          setAnswered(false);
          randNums = getRandNumbers(operation, 0,maxNumber);
          setOperands(randNums)
        }
        
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        const numberButtons = numbers.map((number)=>
<NumberButton value={number} key={number} 
handleClick={appendToAnswer}/>)

const equationClass = answered ? 'row my-2 text-primary fade'
: 'row my-2 text-secondary';

return (
  <main className="text-center" id="game-container">
  <div className="row border-bottom" style={{fontSize:"1.5em"}}>
    <div className="col px-3 text-left">
      <Score score={score}/>
    </div>
    <div  className="col px-3 text-right">
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft}/>
    </div>2
  </div>
  <div className={equationClass} id="equation">
    <Equation question={question} answer={userAnswer} />
  </div>
  <div className="row" id="buttons">
    <div className="col">
      {numberButtons}
      <ClearButton handleClick={setUserAnswer}/>
    </div>
  </div>
</main>

    )
}
export default Game;