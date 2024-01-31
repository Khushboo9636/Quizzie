
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
// import { useNavigate } from 'react-router-dom';
// import styles from './Style.module.css';

// function QuizPlay() {
//     const { quizId } = useParams();
//     const navigate = useNavigate();

//     const [quiz, setQuiz] = useState(null);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [userAnswers, setUserAnswers] = useState([]);
//     const [score, setScore] = useState(0); // New state to store the score
//     //const [pollStatistics, setPollStatistics] = useState({}); // New state to store poll statistics

//     const [timer, setTimer] = useState(null);

//     useEffect(() => {
//         const fetchQuizData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:4000/api/quiz/take/${quizId}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log("Quiz Data:", data); 
//                     setQuiz(data);
//                 } else {
//                     console.error('Failed to fetch quiz data:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching quiz data:', error.message);
//             }
//         };

//         fetchQuizData();
//     }, [quizId]);

//     useEffect(() => {
//         const startTimer = () => {
//             if (!quiz || !quiz.answers || !quiz.answers[currentQuestionIndex]) {
//                 return;
//             }
//             const question = quiz.answers[currentQuestionIndex];
//             if (question && question.timer && question.timer > 0) {
//                 setTimer(question.timer);
//                 const interval = setInterval(() => {
//                     setTimer(prevTimer => prevTimer - 1);
//                 }, 1000);
//                 return () => clearInterval(interval);
//             }
//         };
    
//         startTimer(); 
//     }, [currentQuestionIndex, quiz]);

//     const handleNextQuestion = () => {
//         setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//     };

//     const handleAnswerSubmission = (selectedOptionIndex) => {

//         const currentQuestion = quiz.questions[currentQuestionIndex];
//     const selectedOption = currentQuestion.options[selectedOptionIndex];

//         const updatedUserAnswers = [...userAnswers];
//         updatedUserAnswers[currentQuestionIndex] = selectedOptionIndex;
//         setUserAnswers(updatedUserAnswers);

       
//         if (selectedOption.isCorrect) {
           
//             setScore(prevScore => prevScore + 1);
//         }


//         if (currentQuestionIndex < (quiz?.answers?.length ?? 0) - 1) {
//             handleNextQuestion();
//         } else {
//             if (quiz) {
//                 const quizType = quiz.quizType;
//                 if (quizType === 'Q&A') {
//                     console.log(score)
//                     navigate('/qa-result', { state: { score: score } });
//                 } else if (quizType === 'Poll') {
//                     navigate('/poll-result');
//                 } else {
//                     console.error('Unknown quiz type:', quizType);
//                 }
//             } else {
//                 console.error('Quiz data is not available.');
//             }
//         }
//     };

//     if (!quiz || !quiz.answers || !quiz.answers[currentQuestionIndex]) {
//         return <div>Loading...</div>;
//     }

//     const renderOption = (option) => {
//         if (option.imageURL && ! option.text) {
//             return <img src={option.imageURL} alt={option.text} className={styles.optionImage} style={{width:"100%", height:"100%"}}/>;
//         } else if (option.text && option.imageURL) {
//             return (
//                 <div className={styles.optionFlexContainer}>
//                     <span className={styles.optionText} style={{width:"50%"}}>{option.text}</span>
//                     <img src={option.imageURL} alt={option.text} className={styles.optionImage} style={{width:"50%", height:"100%"}}/>
//                 </div>
//             );
//         } else {
//             return <span className={styles.optionText}>{option.text}</span>;
//         }
//     };

    
 
    

//     return (
//         <div className={styles.Quiz_mainContainer}>
//             <div className={styles.quiz_questionContent}>
//                 <div className={styles.header}>
//                     <div>{currentQuestionIndex + 1}/{quiz.answers.length}</div>
//                     <div className={styles.questTimer}>
//                         {timer && `Timer: ${timer} sec`}
//                     </div>
//                 </div>
//                 <div className={styles.questions_container}>
//                     <h5 className={styles.quizTitle}>{quiz.answers[currentQuestionIndex].text}</h5>
//                     <div className={styles.quiz_options}>
//                         {quiz.answers[currentQuestionIndex].options.map((option, index) => (
//                             <div key={option._id} className={styles.option} onClick={() => handleAnswerSubmission(option)}>
//                                 {renderOption(option)}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <button className={styles.next_Submit} onClick={handleNextQuestion}>Next</button>
//             </div>
//         </div>
//     );
// }

// export default QuizPlay;


// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router';
// // import { useNavigate } from 'react-router-dom';
// // import styles from './Style.module.css';

// // function QuizPlay() {
// //     const { quizId } = useParams();
// //     const navigate = useNavigate();

// //     const [quiz, setQuiz] = useState(null);
// //     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
// //     const [userAnswers, setUserAnswers] = useState([]);
// //     const [score, setScore] = useState(0); // New state to store the score
// //     const [timer, setTimer] = useState(null);

// //     useEffect(() => {
// //         const fetchQuizData = async () => {
// //             try {
// //                 const response = await fetch(`http://localhost:4000/api/quiz/take/${quizId}`);
// //                 if (response.ok) {
// //                     const data = await response.json();
// //                     console.log("Quiz Data:", data); 
// //                     setQuiz(data);
// //                 } else {
// //                     console.error('Failed to fetch quiz data:', response.statusText);
// //                 }
// //             } catch (error) {
// //                 console.error('Error fetching quiz data:', error.message);
// //             }
// //         };

// //         fetchQuizData();
// //     }, [quizId]);

// //     useEffect(() => {
// //         const startTimer = () => {
// //             if (!quiz || !quiz.answers || !quiz.answers[currentQuestionIndex]) {
// //                 return;
// //             }
// //             const question = quiz.answers[currentQuestionIndex];
// //             if (question && question.timer && question.timer > 0) {
// //                 setTimer(question.timer);
// //                 const interval = setInterval(() => {
// //                     setTimer(prevTimer => prevTimer - 1);
// //                 }, 1000);
// //                 return () => clearInterval(interval);
// //             }
// //         };
    
// //         startTimer(); 
// //     }, [currentQuestionIndex, quiz]);

// //     const handleNextQuestion = () => {
// //         setCurrentQuestionIndex(prevIndex => prevIndex + 1);
// //     };

// //     const handleAnswerSubmission = (selectedOptionIndex) => {
// //         if (!quiz || !quiz.questions || !quiz.questions[currentQuestionIndex]) {
// //             return; // Return early if quiz or questions are not defined
// //         }
// //         const currentQuestion = quiz.questions[currentQuestionIndex];
// //         const selectedOption = currentQuestion.options[selectedOptionIndex];

// //         const updatedUserAnswers = [...userAnswers];
// //         updatedUserAnswers[currentQuestionIndex] = selectedOptionIndex;
// //         setUserAnswers(updatedUserAnswers);

// //         if (selectedOption.isCorrect) {
// //             setScore(prevScore => prevScore + 1);
// //         }

// //         if (currentQuestionIndex < (quiz?.answers?.length ?? 0) - 1) {
// //             handleNextQuestion();
// //         } else {
// //             if (quiz) {
// //                 const quizType = quiz.quizType;
// //                 if (quizType === 'Q&A') {
// //                     console.log(score);
// //                     navigate('/qa-result', { state: { score: score } });
// //                 } else if (quizType === 'Poll') {
// //                     navigate('/poll-result');
// //                 } else {
// //                     console.error('Unknown quiz type:', quizType);
// //                 }
// //             } else {
// //                 console.error('Quiz data is not available.');
// //             }
// //         }
// //     };

// //     if (!quiz || !quiz.answers || !quiz.answers[currentQuestionIndex]) {
// //         return <div>Loading...</div>;
// //     }

// //     const renderOption = (option) => {
// //         if (option.imageURL && ! option.text) {
// //             return <img src={option.imageURL} alt={option.text} className={styles.optionImage} style={{width:"100%", height:"100%"}}/>;
// //         } else if (option.text && option.imageURL) {
// //             return (
// //                 <div className={styles.optionFlexContainer}>
// //                     <span className={styles.optionText} style={{width:"50%"}}>{option.text}</span>
// //                     <img src={option.imageURL} alt={option.text} className={styles.optionImage} style={{width:"50%", height:"100%"}}/>
// //                 </div>
// //             );
// //         } else {
// //             return <span className={styles.optionText}>{option.text}</span>;
// //         }
// //     };

// //     return (
// //         <div className={styles.Quiz_mainContainer}>
// //             <div className={styles.quiz_questionContent}>
// //                 <div className={styles.header}>
// //                     <div>{currentQuestionIndex + 1}/{quiz.answers.length}</div>
// //                     <div className={styles.questTimer}>
// //                         {timer && `Timer: ${timer} sec`}
// //                     </div>
// //                 </div>
// //                 <div className={styles.questions_container}>
// //                     <h5 className={styles.quizTitle}>{quiz.answers[currentQuestionIndex].text}</h5>
// //                     <div className={styles.quiz_options}>
// //     {quiz && quiz.answers && quiz.answers[currentQuestionIndex] && quiz.answers[currentQuestionIndex].options && quiz.answers[currentQuestionIndex].options.map((option, index) => (
// //         <div key={option._id} className={styles.option} onClick={() => handleAnswerSubmission(index)}>
// //             {renderOption(option)}
// //         </div>
// //     ))}
// // </div>


// //                 </div>
// //                 <button className={styles.next_Submit} onClick={handleNextQuestion}>Next</button>
// //             </div>
// //         </div>
// //     );
// // }

// // export default QuizPlay;

//run


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import styles from './Style.module.css';

// function QuizPlay() {
//     const { quizId } = useParams();
//     const navigate = useNavigate();

//     const [quiz, setQuiz] = useState(null);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [userAnswers, setUserAnswers] = useState([]);
//     const [score, setScore] = useState(0);
//     const [timer, setTimer] = useState(null);

//     useEffect(() => {
//         const fetchQuizData = async () => {
//             try {
//                 const response = await fetch(`http://localhost:4000/api/quiz/take/${quizId}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setQuiz(data);
//                     console.log(data);
//                 } else {
//                     console.error('Failed to fetch quiz data:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching quiz data:', error.message);
//             }
//         };

//         fetchQuizData();
//     }, [quizId]);

//     useEffect(() => {
//         const startTimer = () => {
//             if (!quiz || !quiz.answers || !quiz.answers[currentQuestionIndex]) {
//                 return;
//             }
//             const question = quiz.answers[currentQuestionIndex];
//             if (question && question.timer && question.timer > 0) {
//                 setTimer(question.timer);
//                 const interval = setInterval(() => {
//                     setTimer(prevTimer => prevTimer - 1);
//                 }, 1000);
//                 return () => clearInterval(interval);
//             }
//         };

//         startTimer();
//     }, [currentQuestionIndex, quiz]);

//     const handleNextQuestion = () => {
//         setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//     };

//     const handleAnswerSubmission = (selectedOptionIndex) => {
//         if (!quiz || !quiz.answers || !quiz.answers[currentQuestionIndex]) {
//             return;
//         }
//         const currentQuestion = quiz.answers[currentQuestionIndex];
//         const selectedOption = currentQuestion.options[selectedOptionIndex];

//         const updatedUserAnswers = [...userAnswers];
//         updatedUserAnswers[currentQuestionIndex] = selectedOptionIndex;
//         setUserAnswers(updatedUserAnswers);

//         if (selectedOption.isCorrect) {
//             setScore(prevScore => prevScore + 1); // Using functional update to ensure correct score update
//         }

//         if (currentQuestionIndex < (quiz?.answers?.length ?? 0) - 1) {
//             handleNextQuestion();
//         } else {
//             if (quiz) {
//                 const quizType = quiz.quizType;
//                 if (quizType === 'Q&A') {
//                     console.log(score);
//                     navigate('/qa-result', { state:  { score: score + (selectedOption.isCorrect ? 1 : 0) } });
//                 } else if (quizType === 'Poll') {
//                     navigate('/poll-result');
//                 } else {
//                     console.error('Unknown quiz type:', quizType);
//                 }
//             } else {
//                 console.error('Quiz data is not available.');
//             }
//         }
//     };

//     if (!quiz || !quiz.answers || !quiz.answers[currentQuestionIndex]) {
//         return <div>Loading...</div>;
//     }

//     const renderOption = (option) => {
//         if (option.imageURL && !option.text) {
//             return <img src={option.imageURL} alt={option.text} className={styles.optionImage} style={{ width: "100%", height: "100%" }} />;
//         } else if (option.text && option.imageURL) {
//             return (
//                 <div className={styles.optionFlexContainer}>
//                     <span className={styles.optionText} style={{ width: "50%" }}>{option.text}</span>
//                     <img src={option.imageURL} alt={option.text} className={styles.optionImage} style={{ width: "50%", height: "100%" }} />
//                 </div>
//             );
//         } else {
//             return <span className={styles.optionText}>{option.text}</span>;
//         }
//     };

//     return (
//         <div className={styles.Quiz_mainContainer}>
//             <div className={styles.quiz_questionContent}>
//                 <div className={styles.header}>
//                     <div>{currentQuestionIndex + 1}/{quiz.answers.length}</div>
//                     <div className={styles.questTimer}>
//                         {timer && `Timer: ${timer} sec`}
//                     </div>
//                 </div>
//                 <div className={styles.questions_container}>
//                     <h5 className={styles.quizTitle}>{quiz.answers[currentQuestionIndex].text}</h5>
//                     <div className={styles.quiz_options}>
//                         {quiz.answers[currentQuestionIndex].options.map((option, index) => (
//                             <div key={option._id} className={styles.option} onClick={() => handleAnswerSubmission(index)}>
//                                 {renderOption(option)}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <button className={styles.next_Submit} onClick={handleNextQuestion}>Next</button>
//             </div>
//         </div>
//     );
// }

// export default QuizPlay;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Style.module.css';

function QuizPlay() {
    const { quizId } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/quiz/take/${quizId}`);
                if (response.ok) {
                    const data = await response.json();
                    setQuiz(data);
                    console.log(data)
                } else {
                    console.error('Failed to fetch quiz data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching quiz data:', error.message);
            }
        };

        fetchQuizData();
    }, [quizId]);

    useEffect(() => {
        const startTimer = () => {
            if (!quiz || !quiz.answers || !quiz.answers[currentQuestionIndex]) {
                return;
            }
            const question = quiz.answers[currentQuestionIndex];
            if (question && question.timer && question.timer > 0) {
                setTimer(question.timer);
                const interval = setInterval(() => {
                    setTimer(prevTimer => prevTimer - 1);
                }, 1000);
                return () => clearInterval(interval);
            }
        };

        startTimer();
    }, [currentQuestionIndex, quiz]);

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    };

    const handleAnswerSubmission = (selectedOptionIndex) => {
        if (!quiz || !quiz.answers || !quiz.answers[currentQuestionIndex]) {
            return;
        }
        const currentQuestion = quiz.answers[currentQuestionIndex];
        const selectedOption = currentQuestion.options[selectedOptionIndex];

        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestionIndex] = selectedOptionIndex;
        setUserAnswers(updatedUserAnswers);

        if (selectedOption.isCorrect) {
            setScore(prevScore => prevScore + 1); // Increment score for correct answer
        }

        if (currentQuestionIndex < (quiz?.answers?.length ?? 0) - 1) {
            handleNextQuestion();
        } else {
            if (quiz) {
                const quizType = quiz.quizType;
                if (quizType === 'Q&A') {
                    console.log(score)
                    navigate('/qa-result', { state: { score: score } }); // Navigate to Q&A result page
                } else if (quizType === 'Poll') {
                    navigate('/poll-result'); // Navigate to Poll result page
                } else {
                    console.error('Unknown quiz type:', quizType);
                }
            } else {
                console.error('Quiz data is not available.');
            }
        }
    };
  
    if (!quiz || !quiz.answers || !quiz.answers[currentQuestionIndex]) {
        return <div>Loading...</div>;
    }

// if (quiz && quiz.quizType === 'Poll') {
//     if (!quiz || !quiz.questions || !quiz.questions[currentQuestionIndex]) {
//         return <div>Loading...</div>;
//     }
// }

    const renderOption = (option) => {
        if (option.imageURL && !option.text) {
            return <img src={option.imageURL} alt={option.text} className={styles.optionImage} style={{ width: "100%", height: "100%" }} />;
        } else if (option.text && option.imageURL) {
            return (
                <div className={styles.optionFlexContainer}>
                    <span className={styles.optionText} style={{ width: "50%" }}>{option.text}</span>
                    <img src={option.imageURL} alt={option.text} className={styles.optionImage} style={{ width: "50%", height: "100%" }} />
                </div>
            );
        } else {
            return <span className={styles.optionText}>{option.text}</span>;
        }
    };

    return (
        <div className={styles.Quiz_mainContainer}>
            <div className={styles.quiz_questionContent}>
                <div className={styles.header}>
                    <div>{currentQuestionIndex + 1}/{quiz.answers.length}</div>
                    <div className={styles.questTimer}>
                        {timer && `Timer: ${timer} sec`}
                    </div>
                </div>
                <div className={styles.questions_container}>
                    <h5 className={styles.quizTitle}>{quiz.answers[currentQuestionIndex].text}</h5>
                    <div className={styles.quiz_options}>
                        {quiz.answers[currentQuestionIndex].options.map((option, index) => (
                            <div key={option._id} className={styles.option} onClick={() => handleAnswerSubmission(index)}>
                                {renderOption(option)}
                            </div>
                        ))}
                    </div>
                </div>
                <button className={styles.next_Submit} onClick={handleNextQuestion}>Next</button>
            </div>
        </div>
    );
}

export default QuizPlay;
