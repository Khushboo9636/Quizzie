const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizzi.model');
const isAuthenticated = require('../middlewares/quizAuthentication');

router.post('/create',isAuthenticated, async (req, res) => {
    console.log('Request received: ', req.method, req.url)
    try {


       const {title, quizType, questions} = req.body;
        // const {title, quizType, questions} = req.body;

        
        // Validate number of questions
        if (questions.length < 1 || questions.length > 5) {
            throw new Error('A quiz should have between 1 and 5 questions.');
        }
       

        // Validate each question
        questions.forEach(question => {
            if (question.options.length < 2) {
                throw new Error('Each question should have at least 2 options.');
            }
        });

        const updatedQuestions = questions.map(question => ({
            ...question,
            timer: question.timer || null, // Set default timer to null if not provided
        }));

        // Validate timer for each question
        // Modify the timer validation to allow only selected timer values
        // questions.forEach(question => {
        //     if(quizType === 'Q&A'){
        //     if (![null, 5, 10].includes(question.timer)) {
        //    throw new Error('Each question should have a valid timer value (off, 5 seconds, or 10 seconds).');
        //     }
        // } 
        // if (quizType === 'Poll') {
        //     question.timer = null; // No timer for Poll type questions
        // }
        //  });

      
        const newQuiz  = new Quiz({
            user: req.user._id,
            title,
            quizType,
            questions: updatedQuestions,
        });
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
        
    } catch (error) {
        console.error('Error creating quiz:', error);
        // If error occurs, send error response
        res.status(500).json({ error: error.message });
       
        
    }
});

router.get('/getAllQuiz', isAuthenticated, async (req, res) => {
    try {
        const userQuizzes = await Quiz.find({user: req.user._id});
        let totalQuestions = 0;
        userQuizzes.forEach((quiz) => {
            totalQuestions += quiz.questions.length;
        })
        res.json({userQuizzes, totalQuestions});
    } catch (error) {
        res.status(500).json({error: error.message});
        
    }
});

// Anybody can take quiz
// router.get('/take/:quizId', async (req, res) => {
//     try {
//         const quizId = req.params.quizId;
//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ error: 'Quiz not found' });
//         }
       
//         if (quiz.quizType === 'Q&A') {
//             quiz.impressionCount += 1;
//             await quiz.save();
//             const totalQuestions = quiz.questions.length;
//          // Ensure that req.body.answers is defined and is an array
//           const userAnswers = Array.isArray(req.body.answers) ? req.body.answers : [];

//                         // Ensure that the length of userAnswers matches the totalQuestions
             
            
//             const answers = quiz.questions.map((question, index) => {
               
//                 let correctAnswer = null;

//                 if (question.answer && userAnswers[index]) {
//                     const trimmedCorrectAnswer = question.answer.trim().toLowerCase();
//                     const trimmedUserAnswer = userAnswers[index].trim().toLowerCase();
            
//                     if (trimmedCorrectAnswer === trimmedUserAnswer) {
//                         correctAnswer = question.answer;
//                     }
//                 }
//                 return {
//                     text: question.text,
//                     options: question.options,
//                     correctAnswer: correctAnswer,
//                     userAnswer: userAnswers[index],
//                 };
//             });

//             const correctAnswers = answers.filter((answer) => answer.correctAnswer !== null).length;
//             const score = (correctAnswers / totalQuestions) * 100;

//             res.json({
//                 quizId: quiz._id,
//                 title: quiz.title,
//                 score: score,
//                 totalQuestions: totalQuestions,
//                 answers: answers,
//             });
//         }
//        // If it's a Poll quiz
//        else if (quiz.quizType === 'Poll') {
//         quiz.impressionCount += 1;
//         await quiz.save();
//          // Collect statistics for each option
//          const optionStatistics = {};

//          quiz.questions.forEach((question) => {
//              question.options.forEach((option) => {
//                  if (!optionStatistics[option.text]) {
//                      optionStatistics[option.text] = 1;
//                  } else {
//                      optionStatistics[option.text]++;
//                  }
//              });
//          });

//         res.json({
//             quizId: quiz._id,
//             title: quiz.title,
//             message: 'Thank you for participating in the Poll quiz.',
//                 optionStatistics: optionStatistics,
//         });
//     }
//     } catch (error) {
//         console.error('Error fetching quiz:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



//run
 // Anybody can take quiz
// router.get('/take/:quizId', async (req, res) => {
//     try {
//         const quizId = req.params.quizId;
//         const quiz = await Quiz.findById(quizId);
//         if (!quiz) {
//             return res.status(404).json({ error: 'Quiz not found' });
//         }

//         let quizType = null; // Initialize quizType variable
        
//         if (quiz.quizType === 'Q&A') {
//             quizType = 'Q&A'; // Set quizType if it's Q&A
//             quiz.impressionCount += 1;
//             await quiz.save();
//             const totalQuestions = quiz.questions.length;

//             const userAnswers = Array.isArray(req.body.answers) ? req.body.answers : [];
            
//             const answers = quiz.questions.map((question, index) => {
//                 let correctAnswer = null;

//                 if (question.answer && userAnswers[index]) {
//                     const trimmedCorrectAnswer = question.answer.trim().toLowerCase();
//                     const trimmedUserAnswer = userAnswers[index].trim().toLowerCase();
            
//                     if (trimmedCorrectAnswer === trimmedUserAnswer) {
//                         correctAnswer = question.answer;
//                     }
//                 }
//                 return {
//                     text: question.text,
//                     options: question.options,
//                     correctAnswer: correctAnswer,
//                     userAnswer: userAnswers[index],
//                 };
//             });

//             const correctAnswers = answers.filter((answer) => answer.correctAnswer !== null).length;
//             const score = (correctAnswers / totalQuestions) * 100;

//             res.json({
//                 quizId: quiz._id,
//                 title: quiz.title,
//                 score: score,
//                 totalQuestions: totalQuestions,
//                 answers: answers,
//                 quizType: quizType, // Include quizType in the response
//             });
//         }
//         else if (quiz.quizType === 'Poll') {
//             quizType = 'Poll'; // Set quizType if it's Poll
//             quiz.impressionCount += 1;
//             await quiz.save();

//             const optionStatistics = {};
//             quiz.questions.forEach((question) => {
//                 question.options.forEach((option) => {
//                     if (!optionStatistics[option.text]) {
//                         optionStatistics[option.text] = 1;
//                     } else {
//                         optionStatistics[option.text]++;
//                     }
//                 });
//             });

//             res.json({
//                 quizId: quiz._id,
//                 title: quiz.title,
//                 message: 'Thank you for participating in the Poll quiz.',
//                 optionStatistics: optionStatistics,
//                 quizType: quizType, // Include quizType in the response
//             });
//         }
//     } catch (error) {
//         console.error('Error fetching quiz:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.get('/take/:quizId', async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Initialize quizType variable
        let quizType = null;

        // If the quiz type is Q&A
        if (quiz.quizType === 'Q&A') {
            quizType = 'Q&A'; // Set quizType if it's Q&A
            quiz.impressionCount += 1;
            await quiz.save();

            // Calculate total score and update impression count
            let totalScore = 0;
            const userAnswers = Array.isArray(req.body.answers) ? req.body.answers : [];

            const answers = quiz.questions.map((question, index) => {
                let correctAnswer = null;

                if (question.answer && userAnswers[index]) {
                    const trimmedCorrectAnswer = question.answer.trim().toLowerCase();
                    const trimmedUserAnswer = userAnswers[index].trim().toLowerCase();

                    if (trimmedCorrectAnswer === trimmedUserAnswer) {
                        correctAnswer = question.answer;
                        totalScore++; // Increment total score if the answer is correct
                    }
                }

                return {
                    text: question.text,
                    options: question.options,
                    correctAnswer: correctAnswer,
                    userAnswer: userAnswers[index],
                };
            });

            res.json({
                quizId: quiz._id,
                title: quiz.title,
                score: totalScore,
                totalQuestions: quiz.questions.length,
                answers: answers,
                quizType: quizType, // Include quizType in the response
            });
        }
        // If the quiz type is Poll
        else if (quiz.quizType === 'Poll') {
            quizType = 'Poll'; // Set quizType if it's Poll
            quiz.impressionCount += 1;
            await quiz.save();

            const optionStatistics = {}; // Object to store option statistics

            // Loop through each question to collect option statistics
            const questionsWithOptions = quiz.questions.map((question) => ({
                text: question.text,
                options: question.options,
            }));

            // Collect option statistics
            quiz.questions.forEach((question) => {
                question.options.forEach((option) => {
                    if (!optionStatistics[option.text]) {
                        optionStatistics[option.text] = 1; // Initialize count to 1 if the option is not found
                    } else {
                        optionStatistics[option.text]++; // Increment count if the option is found
                    }
                });
            });

            res.json({
                quizId: quiz._id,
                title: quiz.title,
                message: 'Thank you for participating in the Poll quiz.',
                questions: questionsWithOptions,
                optionStatistics: optionStatistics,
                quizType: quizType, // Include quizType in the response
            });
        }
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



//share quiz 
 
router.post('/share/:quizId', async(req, res) => {
    try {
 const quizId = req.params.quizId;

 const quiz = await Quiz.findById(quizId);
 if(!quiz){
    return res.status(404).json({error: 'Quiz not found'});

 }
  
//    const shareableLink = `${req.protocol}://${req.get('host')}/api/quiz/take/${quizId}`;
const backendShareableLink = `${req.protocol}://${req.get('host')}/api/quiz/take/${quizId}`;
const frontendShareableLink = `http://localhost:3000/take/${quizId}`;
//    quiz.shareableLink = shareableLink;
//    await quiz.save();

//    res.json({message: 'Quiz shared successfully', shareableLink });
    // Save the backend shareable link to the quiz document
    quiz.shareableLink = backendShareableLink;
    await quiz.save();

    // Respond with both backend and frontend shareable links
    res.json({message: 'Quiz shared successfully', backendShareableLink, frontendShareableLink});

        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//count quiz
router.get('/countTotalQuizzes', async (req, res) => {
    try {
        const totalQuizzes = await Quiz.countDocuments();
        res.json({ totalQuizzes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//trending quizzes

router.get('/trending', async (req, res) => {
    try {
        const trendingQuizze = await Quiz.find({impressionCount: {$gte: 10} }).sort({impressionCount: -1}).limit(10);
        console.log('Trending Quizzes:', trendingQuizze);
        res.json(trendingQuizze);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

//analystic route 

router.get('/analytics/:quizId', isAuthenticated, async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        // Get all quizzes created by the user
        const userQuizzes = await Quiz.find({ user: req.user._id });

        // Calculate the total number of questions across all quizzes
        let totalQuestions = 0;
        userQuizzes.forEach((userQuiz) => {
            totalQuestions += userQuiz.questions.length;
        });

        // Analytics data object
        const analyticsData = {
            impressionCount: quiz.impressionCount,
            totalQuestions: totalQuestions,
            questionAnalytics: [],  // For Q&A type questions
            optionAnalytics: {},    // For Poll type questions
        };

        // If it's a Q&A quiz
        if (quiz.quizType === 'Q&A') {
            quiz.questions.forEach((question, index) => {
                const questionAnalytics = {
                    questionIndex: index,
                    text: question.text,
                    totalAttempts: 0,
                    correctAttempts: 0,
                    incorrectAttempts: 0,
                };

                if (Array.isArray(quiz.responses)) {
                    quiz.responses.forEach((response) => {
                        const userAnswers = response.answers;

                        // Check if userAnswers is an array and has the expected length
                        if (Array.isArray(userAnswers) && userAnswers.length > index) {
                            const userAnswer = userAnswers[index];

                            // If the question was attempted
                            if (userAnswer !== undefined) {
                                questionAnalytics.totalAttempts++;

                                // If the answer was correct
                                if (userAnswer === question.answer) {
                                    questionAnalytics.correctAttempts++;
                                } else {
                                    questionAnalytics.incorrectAttempts++;
                                }
                            }
                        }
                    });
                }

                analyticsData.questionAnalytics.push(questionAnalytics);
            });
        }

        // If it's a Poll quiz, analyze each option
        if (quiz.quizType === 'Poll') {
            quiz.questions.forEach((question) => {
                question.options.forEach((option) => {
                    if (!analyticsData.optionAnalytics[option.text]) {
                        analyticsData.optionAnalytics[option.text] = 0;
                    }

                    if (Array.isArray(quiz.responses)) {
                        // Count participants who chose each option
                        quiz.responses.forEach((response) => {
                            const userAnswer = response.answers[0]; // Assuming single question quiz

                            if (userAnswer !== undefined && userAnswer === option.text) {
                                analyticsData.optionAnalytics[option.text]++;
                            }
                        });
                    }
                });
            });
        }

        res.json(analyticsData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add this route to your existing code
router.get('/totalValues', isAuthenticated, async (req, res) => {
    try {
        // Get all quizzes created by the user
        const userQuizzes = await Quiz.find({ user: req.user._id });

        // Calculate total questions, total impressions, and total quizzes
        let totalQuestions = 0;
        let totalImpressions = 0;
        const totalQuizzes = userQuizzes.length;

        userQuizzes.forEach((userQuiz) => {
            totalQuestions += userQuiz.questions.length;
            totalImpressions += userQuiz.impressionCount;
        });

        res.json({
            totalQuestions: totalQuestions,
            totalImpressions: totalImpressions,
            totalQuizzes: totalQuizzes,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//timer

router.post('/addTimer/:quizId', isAuthenticated, async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const timerValue = parseInt(req.body.timer);

        const validTimers = [0, 5, 10]; // Valid timer values in seconds

        if (!validTimers.includes(timerValue)) {
            return res.status(400).json({ error: 'Invalid timer value' });
        }

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        quiz.timer = timerValue;
        // Set the timer for each question in the quiz
        quiz.questions.forEach((question) => {
            question.timer = timerValue;
        });

        await quiz.save();
        res.json({ message: 'Timer added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//edit
router.put('/edit/:quizId', isAuthenticated, async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const { title, quizType, timer, questions } = req.body;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Update quiz details
        quiz.title = title || quiz.title;
        quiz.quizType = quizType || quiz.quizType;
        quiz.timer = timer || quiz.timer;
        quiz.questions = questions || quiz.questions;

        const updatedQuiz = await quiz.save();
        res.json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete

router.delete('/delete/:quizId', isAuthenticated, async (req, res) => {
    try {
        const quizId = req.params.quizId;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        await quiz.deleteOne({ _id: quizId });
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/update/:quizId', isAuthenticated, async (req, res) => {
    try {
        const quizId = req.params.quizId;
        const { shareableLink } = req.body;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        
        quiz.shareableLink = shareableLink;

        await quiz.save();

        res.json({ message: 'Quiz updated successfully', quiz });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;


