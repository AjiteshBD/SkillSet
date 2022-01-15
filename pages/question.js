
import questions from "../questions.json";
import { create as ipfsHttpClient } from 'ipfs-http-client';


import { useState } from "react";
import { useRouter } from 'next/router'
import { AvatarGenerator } from 'random-avatar-generator';
import { createSkillMarket } from '../util/util';

const generator = new AvatarGenerator();
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

export default function Questions() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [fileURL,setFileURL] = useState(null);
  const [formInput, updateFormInput] = useState({price:'',name:'',skills:'',skillscore:'',testId:'',fileURL:''});

  async function  createMarket(){
    formInput.skills = router.query.test
    formInput.skillscore =score
    formInput.testId =router.query.testId
    
    const {name,skills,price,skillscore,testId} =formInput;
   
    await createSkillMarket(name,skills,price.toString(),skillscore,testId,router);
 
   
    
}



  

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    console.log(selectedOptions);
  };

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const reload = () => {
    
    setCurrentQuestion(0)
    setScore(0);
    setShowScore(false);

  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
   
    setScore(newScore);
    setShowScore(true);
  };

  return (
      
    <div className="flex flex-col w-screen px-2  justify-center items-center">
     
      {showScore ? (
          
        <h1 className="text-3xl font-semibold text-center text-white">
          You scored {score} out of {questions.length}
          {score >2? <span><p className="text-3xl font-semibold text-center text-green">&#9989; You passed </p>
          <div className='flex justify-center'>
             <div className='w-1/2 flex flex-col pb-10 py-6'>
            <input
            placeholder='Name'
            className='mt-2 border rounded p-2 text-black text-sm'
            onChange={ e => updateFormInput({...formInput, name: e.target.value})} 
            />
            {/* <textarea
            placeholder='skills you can offer'
            className='mt-2 border rounded p-4'
            value={}
            onChange={ e => updateFormInput({...formInput, skills: e.target.value})} 
            /> */}
            <input
            placeholder='Hour Rate/Eth'
            type='number'
            className='mt-2 border rounded p-2 text-black text-sm'
            onChange={ e => updateFormInput({...formInput, price: e.target.value})} 
            />
       
             
            <button  onClick={()=>createMarket()}
            className='font-bold mt-6 bg-purple-500 text-white rounded p-4 shadow-lg text-sm'>
                Mint Skill NFT
            </button>
            
        </div>
    </div>
          
          </span>:<span><p className="text-3xl font-semibold text-center text-red">	
            &#10060; Sorry, You failed!</p>
          <button
              onClick={reload}
              className="w-[70%] py-3 bg-indigo-600 rounded-lg"
            >
              Retest
            </button></span>}
        </h1>
      ) : (
        <>
          <div className="flex flex-col items-start w-full">
            <h4 className="mt-10 text-xl text-white/60">
              Question {currentQuestion + 1} of {questions.length}
            </h4>
            <div className="mt-4 text-2xl text-white">
              {questions[currentQuestion].question}
            </div>
          </div>
          <div className="flex flex-col w-full">
            {questions[currentQuestion].answerOptions.map((answer, index) => (
              <div
                key={index}
                className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                onClick={(e) => handleAnswerOption(answer.answer)}
              >
                <input
                  type="radio"
                  name={answer.answer}
                  value={answer.answer}
                  checked={
                    answer.answer ===
                    selectedOptions[currentQuestion]?.answerByUser
                  }
                  onChange={(e) => handleAnswerOption(answer.answer)}
                  className="w-6 h-6 bg-black"
                />
                <p className="ml-6 text-white">{answer.answer}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between w-full mt-4 text-white">
            <button
              onClick={handlePrevious}
              className="w-[20%] py-3 bg-indigo-600 rounded-lg"
            >
              Previous
            </button>
            <button
              onClick={
                currentQuestion + 1 === questions.length
                  ? handleSubmitButton
                  : handleNext
              }
              className="w-[20%] py-3 bg-indigo-600 rounded-lg"
            >
              {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
