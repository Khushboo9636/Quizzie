// // /* Home.jsx */
// // import React, { useState } from 'react';
// // import style from './Style.module.css';
// // import Sidebar from '../../Components/Sidebar/Sidebar';
// // import Dashboard from '../../Components/Dashboard/Dashboard';
// // import Modal from '../../Components/Modal/Modal';
// // import CreateQuiz from '../../Components/CreateQuiz/CreateQuiz';
// // import QuizAnalysisPage from '../../Components/Analytics/QuizAnalysis/QuizAnalysisPage';

// // function Home() {
// //     const [showCreateQuizPopup, setShowCreateQuizPopup] = useState(false);

// //     const handleCreateQuiz = () => {
// //         setShowCreateQuizPopup(true);
// //         console.log('Create Quiz modal opened');
// //     };

// //     const handleClosePopup = () => {
// //         setShowCreateQuizPopup(false);
// //         console.log('Create Quiz modal closed');
// //     };

// //     return (
// //         <div className={style.mainContainer}>
// //             <Sidebar onCreateQuiz={handleCreateQuiz} />
// //             <div className={style.rightContent}>
// //                 {/* <Dashboard /> */}
// //                 <QuizAnalysisPage/>
// //             </div>
// //             {showCreateQuizPopup && (
// //                 <Modal onClose={handleClosePopup}>
// //                     <CreateQuiz onClose={handleClosePopup} />
// //                 </Modal>
// //             )}
// //         </div>
// //     );
// // }

// // export default Home;



// // Home.jsx
// import React, { useState } from 'react';
// import style from './Style.module.css';
// import Sidebar from '../../Components/Sidebar/Sidebar';
// import Dashboard from '../../Components/Dashboard/Dashboard';
// import Modal from '../../Components/Modal/Modal';
// import CreateQuiz from '../../Components/CreateQuiz/CreateQuiz';
// import QuizAnalysisPage from '../../Components/Analytics/QuizAnalysis/QuizAnalysisPage';

// function Home() {
//     const [showCreateQuizPopup, setShowCreateQuizPopup] = useState(false);
//     const [selectedPage, setSelectedPage] = useState('dashboard'); // Default selected page

//     const handleCreateQuiz = () => {
//         setShowCreateQuizPopup(true);
//         console.log('Create Quiz modal opened');
//     };

//     const handleClosePopup = () => {
//         setShowCreateQuizPopup(false);
//         console.log('Create Quiz modal closed');
//     };

//     return (
//         <div className={style.mainContainer}>
//             <Sidebar
//                 onCreateQuiz={handleCreateQuiz}
//                 onSelectPage={(page) => setSelectedPage(page)} // Pass selected page to Sidebar
//             />
//             <div className={style.rightContent}>
//                 {/* Conditional rendering based on selectedPage */}
//                 {selectedPage === 'dashboard' && <Dashboard />}
//                 {selectedPage === 'analytics' && <QuizAnalysisPage />}
//             </div>
//             {showCreateQuizPopup && (
//                 <Modal onClose={handleClosePopup}>
//                     <CreateQuiz onClose={handleClosePopup} />
//                 </Modal>
//             )}
//         </div>
//     );
// }

// export default Home;

// Home.jsx
import React, { useState } from 'react';
import style from './Style.module.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Dashboard from '../../Components/Dashboard/Dashboard';
import Modal from '../../Components/Modal/Modal';
import CreateQuiz from '../../Components/CreateQuiz/CreateQuiz';
import QuizAnalysisPage from '../../Components/Analytics/QuizAnalysis/QuizAnalysisPage';
import QuestionAnalysisPage from '../../Components/Analytics/QuestionAnalysis/QuestionAnalysisPage';


function Home() {
    const [showCreateQuizPopup, setShowCreateQuizPopup] = useState(false);
    const [selectedPage, setSelectedPage] = useState('dashboard'); // Default selected page
    const [selectedQuizId, setSelectedQuizId] = useState(null); // State to store selected quiz ID

    const handleCreateQuiz = () => {
        setShowCreateQuizPopup(true);
        console.log('Create Quiz modal opened');
    };

    const handleClosePopup = () => {
        setShowCreateQuizPopup(false);
        console.log('Create Quiz modal closed');
    };

    const handleQuizRowClick = (quizId) => {
        setSelectedQuizId(quizId);
        setSelectedPage('questionAnalysis'); 
    };

    return (
        <div className={style.mainContainer}>
            <Sidebar
                onCreateQuiz={handleCreateQuiz}
                onSelectPage={(page) => setSelectedPage(page)}
            />
            <div className={style.rightContent}>
                {/* Conditional rendering based on selectedPage */}
                {selectedPage === 'dashboard' && <Dashboard />}
                {selectedPage === 'analytics' && <QuizAnalysisPage onQuizRowClick={handleQuizRowClick} />}
                {selectedPage === 'questionAnalysis' && <QuestionAnalysisPage quizId={selectedQuizId} />}
            </div>
            {showCreateQuizPopup && (
                <Modal onClose={handleClosePopup}>
                    <CreateQuiz onClose={handleClosePopup} />
                </Modal>
            )}
        </div>
    );
}

export default Home;
