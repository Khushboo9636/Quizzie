import React, { useState } from 'react';
import { useEffect } from 'react';
import style from './Style.module.css';
import Modal from '../Modal/Modal.jsx';
import QAForm from '../Q&AForm/Q&AForm.jsx';
import Poll from '../Poll/Poll.jsx';
import ShareModal from '../ShareLink/ShareModal.jsx';
//import {toast} from 'react-toastify';

function CreateQuiz({data, onClose }) {
    const [formData, setFormData] =  useState({
        title: data ? data.title :'',
        quizType: data ? data.quizType : '',
        questions: data ? data.questions : [],
    })
    const [showQAPopup, setShowQAPopup] = useState(false);
    const [showCreateQuiz, setShowCreateQuiz] = useState(true); // State to control rendering
    const [showPollForm, setShowPollForm] = useState(false);
    const [shareableLink, setShareableLink] = useState('');
    const [showShareModal, setShowShareModal] = useState(false);

    // Update form data when data prop changes
    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title,
                quizType: data.quizType,
                questions: data.questions,
            });
        }
    }, [data]);

    const handleCancelCreateQuiz = () => {
        onClose();
    };

    const handleContinue = () => {
        
        if (formData.quizType === 'Q&A') {
            setShowQAPopup(true);
            
            setShowCreateQuiz(false);
            
            console.log('on clicking continue button print formdata: ',formData)
        } else if (formData.quizType === 'Poll') {
            // logic for poll
            setShowPollForm(true);
            setShowCreateQuiz(false);
           
            console.log('on clicking continue button print formdata: ',formData)
        }
    };
    const handleCancelQA = () => {
        setShowQAPopup(false);
        setShowPollForm(false);
        setShowCreateQuiz(true);
       
    };

    const handleQuizTypeChange = (event) => {
        const newQuizType = event.target.value;
        setFormData({
            ...formData,
            quizType: newQuizType
        })
    };


   
    const handleSubmitQuiz = async (childFormData) => {
        console.log('final data:', childFormData);
        try {
            
           // const questions = childFormData.questions.questions;
           const questions = childFormData.questions.questions.map(question => ({
            text: question.text,
            options: question.options.map(option => ({
                text: option.text,
                imageURL: option.imageURL 
            })),
            answer: question.answer,
            optionType: question.optionType,
            timer: question.timer === 'off' ? null : parseInt(question.timer), // Convert timer to number
            }));

            if (!Array.isArray(questions)) {
                console.error('Error creating quiz: Questions must be provided as an array.');
                return;
            }
    
            // Proceed with quiz creation request
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/quiz/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: childFormData.title,
                    quizType: childFormData.quizType,
                    questions: questions, // Directly pass the questions array
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Quiz created:', data);

                const quizId = data._id;
                // Generate shareable link for the quiz
               const shareResponse = await fetch(`http://localhost:4000/api/quiz/share/${quizId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (shareResponse.ok) {
                const shareData = await shareResponse.json();
                console.log('Shareable link generated:', shareData.shareableLink);
                // setShareableLink(shareData.shareableLink);
                setShareableLink(shareData.frontendShareableLink)
                // Update formData with the shareable link
                    setFormData({
                  ...childFormData,
                 shareableLink: shareData.shareableLink
                       });
                       setShowCreateQuiz(false);
                       setShowShareModal(true);

    
               const updateResponse = await fetch(`http://localhost:4000/api/quiz/update/${quizId}`, {
                    method: 'PUT',
                     headers: {
                          'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                      body: JSON.stringify({
                          shareableLink: shareData.shareableLink
                     }),
                  });

                  if (updateResponse.ok) {
                    console.log('Shareable link stored in the database.');
                 } else {
                     console.error('Failed to store shareable link in the database:', updateResponse.statusText);
                 }

            } else {
                console.error('Failed to generate shareable link:', shareResponse.statusText);
            }
                
                
            } else {
                console.error('Failed to create quiz:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating quiz:', error.message);
        }
    };
    
    
    
    
   

    return (
        <Modal onClose={onClose}>
            <div className={style.popup}>
                {showCreateQuiz &&  !showShareModal && ( // Conditionally render CreateQuiz content
                    <>
                        {/* Content of the popup */}
                        <div>
                          <input
                            type="text"
                            className={style.quiz}
                            placeholder="Quiz Name"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title:e.target.value})}
                          />
                        </div>
                        <div className={style.quizType}>
                        <div> Quiz Type: </div>   
                          <label>
                            <input type="radio"
                                value="Q&A"
                                checked={formData.quizType === "Q&A"}
                                onChange={handleQuizTypeChange}
                            />
                                    Q&A
                        </label>
                        <label>
                                    <input
                                        type="radio"
                                        value="Poll"
                                        checked={formData.quizType === "Poll"}
                                        onChange={handleQuizTypeChange}
                                    />
                                    Poll
                        </label>
                            
                        </div>
                        <div className={style.buttonGroup}>
                        <button className={style.cancel} onClick={handleCancelCreateQuiz}>Cancel</button>
                        <button className={style.confirm} onClick={handleContinue}>Continue</button>
                        </div>
                    </>
                )}
                {/* Conditional rendering of Q&A Form */}
                {/* {showQAPopup && (
                    <QAForm onClose={() => setShowQAPopup(false)} onSubmit={handleSubmitQuiz} />
                )} */}
                 {showQAPopup && (
                    <QAForm
                    onClose={handleCancelQA}
                    onSubmit={(qaFormData) =>
                        handleSubmitQuiz({ title: formData.title, quizType: 'Q&A', questions: qaFormData })
                    }
                    formData={formData} // Pass formData as prop
                />
                )}
                {showPollForm && (
                    <Poll
                        onClose={handleCancelQA}
                        onSubmit={(pollData) =>
                            handleSubmitQuiz({ title: formData.title, quizType: 'Poll', questions: pollData })
                        }
                        formData={formData} // Pass formData as prop
                    />
                )}

            </div>
            {showShareModal  && (
                <ShareModal shareableLink={shareableLink} onClose={onClose} />
            )}
        </Modal>
    );
}

export default CreateQuiz;


