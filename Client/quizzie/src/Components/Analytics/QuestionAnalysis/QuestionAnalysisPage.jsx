import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './Style.module.css'


function QuestionAnalysisPage() {
    const { quizId } = useParams();
    const [questionAnalytics, setQuestionAnalytics] = useState([]);

    useEffect(() => {
        console.log("quizId:", quizId); // Debugging statement

        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:4000/api/quiz/analytics/${quizId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setQuestionAnalytics(data.questionAnalytics);
                } else {
                    console.error('Failed to fetch analytics:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching analytics:', error.message);
            }
        };

        fetchAnalytics();
    }, [quizId]); // Include quizId in the dependency array

    return (
        <div>
          
            <h1 className={style.h1}>Question Analysis</h1>
            <div className={style.questionlist}>
                {questionAnalytics.map((analytics, index) => (
                    <div key={index} className={style.questionItem}>
                        <h3 className={style.title}>{analytics.text}</h3>
                           <div className={style.topContainer}>
                             <div className={style.totalAttempts}>
                                <p>Total Attempts: {analytics.totalAttempts}</p>

                             </div>
                             <div className={style.correctAttempt}>
                             <p>Correct Attempts: {analytics.correctAttempts}</p>

                          </div>
                           <div className={style.incorrect}>
                           <p>Incorrect Attempts: {analytics.incorrectAttempts}</p>
                             </div>

                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestionAnalysisPage;
