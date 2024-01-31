
import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
import DeleteModal from '../DeleteQuestions/DeleteModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateQuiz from '../../CreateQuiz/CreateQuiz';


function QuizAnalysisPage({ onQuizRowClick }) {
    const [quizzes, setQuizzes] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null); // Define selectedQuiz state
    const [editModalData, setEditModalData] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchQuizzes();
    }, []);


    const fetchQuizzes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://quiz-api-djxd.onrender.com/api/quiz/getAllQuiz', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setQuizzes(data.userQuizzes);
            } else {
                console.error('Failed to fetch quizzes:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching quizzes:', error.message);
        }
    };

    const handleEdit = async (quizId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://quiz-api-djxd.onrender.com/api/quiz/edit/${quizId}`, {
                   method: 'PUT', 
            headers: {
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${token}`
            },
            });
            if (response.ok) {
                const data = await response.json();
                setEditModalData(data); // Set the data for the edit modal
                setShowCreateModal(true)
            } else {
                console.error('Failed to fetch quiz data for edit:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching quiz data for edit:', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://quiz-api-djxd.onrender.com/api/quiz/delete/${selectedQuiz._id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                // Refresh quizzes after successful deletion
                fetchQuizzes();
                // Close the modal after successful deletion
                setShowDeleteModal(false);
            } else {
                console.error('Failed to delete quiz:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting quiz:', error.message);
        }
    };

    const openDeleteModal = (quiz) => {
        setSelectedQuiz(quiz);
        setShowDeleteModal(true); // Show the delete modal
    };

    const closeDeleteModal = () => {
        setSelectedQuiz(null);
        setShowDeleteModal(false); // Close the delete modal
    };

    const copyShareableLink = async (quizId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://quiz-api-djxd.onrender.com/api/quiz/share/${quizId}`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                //setShareableLink(shareData.frontendShareableLink)
                navigator.clipboard.writeText(data.frontendShareableLink);
                toast.success('Shareable link copied to clipboard!', {
                    position: 'top-center'
                });
            } else {
                console.error('Failed to copy shareable link:', response.statusText);
            }
        } catch (error) {
            console.error('Error copying shareable link:', error.message);
        }
    };

    return (
        <div>
            <h1 style={{paddingLeft:"52px", paddingRight:"35px",paddingTop:"32px", color:"#5076ff"}}>Quiz Analysis</h1>
            <table style={{height: "76vh",overflow: "scroll",
    display: "block",
    margin: "50px",
    scrollbarWidth: "none",
    marginBlock: "auto",
    
    borderSpacing: "2px",
    borderColor: "gray"}}>
                <thead style={{background:"#5076ff", color:"#fffff" }}>
                    <tr>
                        <th>S.No</th>
                        <th>Quiz Name</th>
                        <th>Created On</th>
                        <th>Impression</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Share</th>
                        <th>Question Wise Analysis</th>
                    </tr>
                </thead>
                <tbody>
                    {quizzes.map((quiz, index) => (
                        <tr key={quiz._id} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2;' : '#b3c4ff' }}>
                            <td>{index + 1}</td>
                            <td>{quiz.title}</td>
                            <td>{quiz.createdAt}</td>
                            <td>{quiz.impressionCount}</td>
                            <td><button onClick={() => handleEdit(quiz._id)}>Edit</button></td>
                            <td>
                                <button onClick={() => openDeleteModal(quiz)}>Delete</button>
                            </td>
                            <td>
                                <button onClick={() => copyShareableLink(quiz._id)}>Share</button>
                            </td>
                            {/* Add the Link component for Question Wise Analysis */}
                            <td>
                                {/* <Link to={`/analytics/${quiz._id}`}>Question Wise Analysis</Link> */}
                                <button onClick={() => onQuizRowClick(quiz._id)}>Question Wise Analysis</button>
                            </td>
                        </tr>
                    ))}
                       {showCreateModal && (
                <CreateQuiz data={editModalData} onClose={() => setShowCreateModal(false)} />
            )}
                </tbody>
            </table>

            {/* Render the delete modal */}
            {showDeleteModal && (
                <DeleteModal onClose={closeDeleteModal} onConfirm={handleDelete} />
            )}
            <ToastContainer />
        </div>
    );
}

export default QuizAnalysisPage;


