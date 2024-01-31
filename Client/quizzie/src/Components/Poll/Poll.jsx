import React, { useState } from 'react';
import style from './Style.module.css';
import Modal from '../Q&AForm/QAModal/Modal'
import del from '../../assets/delete.png'

function Poll({ onClose, onSubmit }) {
    const [questions, setQuestions] = useState([
        { text: '', options: [{ text: '', imageURL: '' }], optionType: 'Text' }
        // { text: '', options: [{ text: '' }], optionType: 'Text' } // Initial question state
    ]);
    const [optionType, setOptionType] = useState('text');
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    const handleAddOption = (questionIndex) => {
        if (questions[questionIndex].options.length < 4) {
            const newQuestions = [...questions];
            newQuestions[questionIndex].options.push({ text: '' });
            setQuestions(newQuestions);
        }
    };

    const handleDeleteOption = (questionIndex, optionIndex) => {
        if (questions[questionIndex].options.length > 1) {
            const newQuestions = [...questions];
            newQuestions[questionIndex].options.splice(optionIndex, 1);
            setQuestions(newQuestions);
        }
    };

    
    const handleTextChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex].text = value;
        setQuestions(newQuestions);
    };
    const handleURLChange = (questionIndex, optionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex].imageURL = value;
        setQuestions(newQuestions);
    };
    
    const handleAddQuestion = () => {
        if (questions.length < 5) {
            const newQuestion = { text: '', options: [{ text: '', imageURL: '' }], answer: null, optionType: 'Text', timer: 'off' };
            const newQuestions = [...questions, newQuestion];
            setQuestions(newQuestions);
            setActiveQuestionIndex(newQuestions.length - 1);
        }
    };


    const handleDeleteQuestion = (index) => {
        if (questions.length > 1) {
            const newQuestions = [...questions];
            newQuestions.splice(index, 1);
            setQuestions(newQuestions);
            setActiveQuestionIndex(0);
        }
    };
    const handleSelectQuestion = (index) => {
        setActiveQuestionIndex(index);
    };

    // const handleFormSubmit = () => {
    //         const formattedQuestions = questions.map(question => ({
    //            text: question.text,
    //            options: question.options.map(option => ({
    //                text: option.text,
    //                imageURL: null // Assuming imageURL is not provided from the frontend
    //       })),
                   
    //              optionType: question.optionType,
                    
    //         }));
            
    //        console.log('Formatted Questions:', formattedQuestions);
            
    //        // Pass formatted questions to the parent component
    //          onSubmit({questions: formattedQuestions });
    //       // Close the form
    //       onClose();
    // };

    
    const handleFormSubmit = () => {
        onSubmit({ questions });
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal>  
         <div className={style.popup}>
          <div className={style.header}>
              <div className={style.buttonNo}> 
                    {questions.map((question, index) => (
                        <div key={index} className={style.circularButton} onClick={() => handleSelectQuestion(index)}>
                            <span className={style.questionNumber}>{index + 1}</span>
                            <button className={style.delQuest} onClick={() => handleDeleteQuestion(index)}>x</button>
                        </div>
                    ))}
                    <button className={style.addButton} onClick={handleAddQuestion}>+</button>
               </div>   
               <p className={style.maxQuestions}>Max 5 questions</p>
         </div>
         <div className={style.mainContent}>
            {questions.map((question, index) => (
                <div key={index} style={{ display: activeQuestionIndex === index ? 'block' : 'none' }}>
                     
                  <div className={style.questionInput}>
                    <input
                        type="text"
                        className={style.QAquestionInput}
                        placeholder={`Question ${index + 1}`}
                        value={question.text}
                        onChange={(e) => {
                            const newQuestions = [...questions];
                            newQuestions[index].text = e.target.value;
                            setQuestions(newQuestions);
                        }}
                    />
                  </div>
                    <div className={style.optionTypeContainer}>
                        <div className={style.optionTypeText}> Option Types: </div>
                        <div className={style.labelType}>
                            <input type="radio" name={`optionType-${index}`} checked={optionType === 'Text'} onChange={() => setOptionType('Text')} />
                            <label htmlFor={`optionType-${index}`}>Text</label>
                        </div>
                        <div className={style.labelType} style={{marginLeft: "1.5rem"}}>
                               <input type="radio" name={`optionType-${index}`} checked={optionType === 'Image URL'} onChange={() => setOptionType('Image URL')} />
                                <label htmlFor={`optionType-${index}`}>URL</label>
                        </div>
                       <div className={style.labelType} style={{marginLeft: "0.5rem"}}>
                               <input type="radio" name={`optionType-${index}`} checked={optionType === 'Text & Image URL'} onChange={() => setOptionType('Text & Image URL')} />
                               <label htmlFor={`optionType-${index}`}>Text & URL</label>
                        </div>
                    </div>
                <div className={style.inputContent}>
                    <div className={style.optionsGroup}>
                    {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} style={{marginBottom:"5px"}}>
                            {optionType === 'Text' && (
                                <>
                                    
                                    <input
                                        type="text"
                                        className={style.optionsInput}
                                        placeholder={`Text Option ${optionIndex + 1}`}
                                        value={option.text || ''}
                                        onChange={(e) => handleTextChange(index, optionIndex, e.target.value)}
                                    />
                                    <img src={del} className={style.imgDel} alt='Delete'  onClick={() => handleDeleteOption(index, optionIndex)}/>
                                </>
                            )}
                            {optionType === 'Image URL' && (
                                <>
                                    
                                    <input
                                        type="url"
                                        className={style.optionsInput}
                                        placeholder={`URL Option ${optionIndex + 1}`}
                                        value={option.imageURL || ''}
                                        onChange={(e) => handleURLChange(index, optionIndex, e.target.value)}
                                    />
                                    <img src={del} className={style.imgDel}  alt='Delete'  onClick={() => handleDeleteOption(index, optionIndex)}/>
                                </>
                            )}
                            {optionType === 'Text & Image URL' && (
                                <div style={{display:"flex",flexFlow:"row"}}>
                                    
                                    <input
                                        type="text"
                                        className={style.optionsInput}
                                        placeholder={`Text ${optionIndex + 1}`}
                                        value={option.text || ''}
                                        onChange={(e) => handleTextChange(index, optionIndex, e.target.value)}
                                    />
                                    <input
                                        type="url"
                                        className={style.optionsInput}
                                        placeholder={`URL ${optionIndex + 1}`}
                                        value={option.imageURL ||''}
                                        onChange={(e) => handleURLChange(index, optionIndex, e.target.value)}
                                    />
                                    <img src={del} className={style.imgDel}  alt='Delete'  onClick={() => handleDeleteOption(index, optionIndex)}/>
                                </div>
                            )}
                        </div>
                    ))}
                    <button className={style.addOption} onClick={() => handleAddOption(index)}>Add Option</button>

                   </div>    
                   

                 </div>

                    <div className={style.btnGroup}>
                    <button className={style.cancelBtn} onClick={handleCancel}>Cancel</button>
                  <button className={style.createBtn} onClick={handleFormSubmit}>Create Quiz</button>

                   </div>
                    {/* <button onClick={() => handleDeleteQuestion(index)}>Delete Question</button> */}
                </div>
            ))}

            {/* <button onClick={handleAddQuestion}>Add Question</button> */}
            {/* {questions.map((question, index) => (
                <button key={index} onClick={() => handleSelectQuestion(index)}>Question {index + 1}</button>
            ))} */}
                  
         </div>   
        </div>
     
        </Modal>
    );
}

export default Poll;
