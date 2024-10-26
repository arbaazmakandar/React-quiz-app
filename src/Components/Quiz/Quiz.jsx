import React, { useRef, useState } from "react";
import "./Quiz.css";

export const data = [
  {
    question: "Which device is required for the Internet connection?",
    option1: "Modem",
    option2: "Router",
    option3: "LAN Cable",
    option4: "Pen Drive",
    ans: 1,
  },
  {
    question: "Which continent has the highest number of countries?",
    option1: "Asia",
    option2: "Europe",
    option3: "North America",
    option4: "Africa",
    ans: 4,
  },
  {
    question: "Junk e-mail is also called?",
    option1: "Spam",
    option2: "Fake",
    option3: "Archived",
    option4: "Bin",
    ans: 1,
  },
  {
    question: "A computer cannot BOOT if it does not have the?",
    option1: "Application Software",
    option2: "Internet",
    option3: "Operating System",
    option4: "Mouse",
    ans: 3,
  },
  {
    question: "First page of Website is termed as?",
    option1: "Index Page",
    option2: "Homepage",
    option3: "Sitemap",
    option4: "Pen Drive",
    ans: 2,
  },
];

const Quiz = () => {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const handleClick = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      OptionArray.map((element) => element.current.classList.remove("wrong"));
      OptionArray.map((element) => element.current.classList.remove("correct"));
    }
  };

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const OptionArray = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      setLock(true);
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore(score + 1);
      } else {
        e.target.classList.add("wrong");
        OptionArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>
            You Scored : {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question?.question}
          </h2>
          <ul>
            <li onClick={(e) => checkAns(e, 1)} ref={Option1}>
              {question?.option1}
            </li>
            <li onClick={(e) => checkAns(e, 2)} ref={Option2}>
              {question?.option2}
            </li>
            <li onClick={(e) => checkAns(e, 3)} ref={Option3}>
              {question?.option3}
            </li>
            <li onClick={(e) => checkAns(e, 4)} ref={Option4}>
              {question?.option4}
            </li>
          </ul>
          <button onClick={handleClick}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
