import React, { useEffect, useState } from 'react';
import style from './Style.module.css';
import eye from '../../assets/eye.png'
function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [trendingQuizzes, setTrendingQuizzes] = useState([]);
  useEffect(() => {
    fetchUserData();
    fetchTrendingQuizzes();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch("http://localhost:4000/api/quiz/totalValues", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const fetchTrendingQuizzes= async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch("http://localhost:4000/api/quiz/trending", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const trendingData = await response.json();
      setTrendingQuizzes(trendingData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className={style.mainContainer}>
        <div className={style.topContainer}>
            <div className={style.quizCreated}>
            <div className={style.quiznum}>{userData ? userData.totalQuizzes : 'Loading...'}</div>
              Quizzes Created
            </div>
            <div className={style.questions}>
            <div className={style.quiznum}>{userData ? userData.totalQuestions : 'Loading...'}</div>
              Question Created
            </div>
            <div className={style.impression}>
            <div className={style.quiznum}> {userData ? userData.totalImpressions : 'Loading...'}</div>
              Impression
            </div>

        </div>
        <div className={style.bottomContainer}>
            <div className={style.quizTrending}>
                <h1 className={style.h1}>Trending Quizs</h1>
                <div className={style.numberOfQuiz}>
                  {trendingQuizzes.map((quiz) => (
                    <div key={quiz._id} className={style.quizItem}>
                      <div className={style.showImp}>
                      <p className={style.name}>{quiz.title}</p>
                      
                      <p className={style.numb} > {quiz.impressionCount}</p> 
                      <img src={eye} alt='eye' style={{width:"10%",height:"30%%" }}/>
                      </div>
                      <p className={style.create}> Create on {new Date(quiz.createdAt).toLocaleDateString()}</p>
                      </div>
                  ))}
                    

                </div>

            </div>

        </div>
      
    </div>
  )
}

export default Dashboard
