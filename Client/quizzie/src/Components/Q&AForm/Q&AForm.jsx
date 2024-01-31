
import React, { useState } from 'react';
import style from './Style.module.css';
import Modal from './QAModal/Modal';
import del from '../../assets/delete.png'
function QAForm({ onClose, onSubmit }) {
    const [questions, setQuestions] = useState([
        { text: '', options: [{ text: '', imageURL: '' }], answer: null, optionType: 'Text', timer: 'off' }
    ]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [optionType, setOptionType] = useState('Text');
    const [selectedTimer, setSelectedTimer] = useState(null);

    const handleAddOption = (questionIndex) => {
        if (questions[questionIndex].options.length < 4) {
            const newQuestions = [...questions];
            newQuestions[questionIndex].options.push({ text: '', imageURL: '' });
            setQuestions(newQuestions);
        }
    };

    const handleDeleteOption = (questionIndex, optionIndex) => {
        if (questions[questionIndex].options.length > 2) {
            const newQuestions = [...questions];
            newQuestions[questionIndex].options.splice(optionIndex, 1);
            setQuestions(newQuestions);
            if (newQuestions[questionIndex].answer === optionIndex) {
                newQuestions[questionIndex].answer = null;
                setQuestions(newQuestions);
            }
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

    

    const handleCorrectOptionChange = (questionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].answer = optionIndex;
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

    const handleFormSubmit = () => {
        onSubmit({ questions });
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const handleTimerChange = (questionIndex, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].timer = value;
        setQuestions(newQuestions);
        setSelectedTimer(value);
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
                                        type="radio" className={style.optionRadio}
                                        checked={question.answer === optionIndex}
                                        onChange={() => handleCorrectOptionChange(index, optionIndex)}
                                    />
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
                                        type="radio"  className={style.optionRadio}
                                        checked={question.answer === optionIndex}
                                        onChange={() => handleCorrectOptionChange(index, optionIndex)}
                                    />
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
                                        type="radio" className={style.optionRadio}
                                        checked={question.answer === optionIndex}
                                        onChange={() => handleCorrectOptionChange(index, optionIndex)}
                                    />
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
                   <div className={style.timmer}>
                        <div className={style.timing}>Timer: </div>
                              <label style={{ marginLeft: '0.5rem' }}>
                              <input
                                type="radio"
                                     name={`timer-${index}`}
                                    value={null}
                                    checked={selectedTimer === null}
                                   onChange={() => handleTimerChange(index, null)}
                                 />
                                     Off
                                   </label>
                              <label style={{ marginLeft: '0.5rem' }}>
                              <input
                                  type="radio"
                                 name={`timer-${index}`}
                                      value={5}
                                       checked={selectedTimer === 5}
                                  onChange={() => handleTimerChange(index, 5)}
                                     />
                                   5 sec
                               </label>
                          <label style={{ marginLeft: '0.5rem' }}>
                                <input
                                  type="radio"
                                  name={`timer-${index}`}
                              value={10}
                           checked={selectedTimer === 10}
                              onChange={() => handleTimerChange(index, 10)}
                            />
                          10 sec
                     </label>
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

export default QAForm;


