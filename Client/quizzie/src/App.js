// Import necessary dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import LoginSignup from './Pages/LoginSignUp/LoginSignup.jsx';
import Home from './Pages/Home/Home.jsx';
import QuizPlay from './Pages/Quiz/QuizPlay/QuizPlay.jsx';
import QAResult from './Pages/Quiz/QuizResult/QADisplay/QAResult.jsx';
import PollResult from './Pages/Quiz/QuizResult/PollDisplay/PollResult.jsx';

//import QAResult from './Pages/Quiz/QuizResult/QADisplay/QAResult.jsx';


function App() {
 
  const handleSuccess = (success) => {
    // Define your logic for signup success here
    console.log('Signup success:', success);
  };

  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={<LoginSignup handleSuccess={handleSuccess} />}
        /> 
        <Route path="/dashboard" element={<Home/>} />
        <Route path="/analysis" element={<Home/>} />
        <Route path="/analytics/:quizId" element={<Home />} />
        <Route path="/take/:quizId" element={ <QuizPlay/> } /> 
        <Route path="/qa-result" element={ <QAResult/> } /> 
        <Route path="/poll-result" element={ <PollResult/> } /> 
       
        
      </Routes>
    </Router>
  );
}

export default App;

