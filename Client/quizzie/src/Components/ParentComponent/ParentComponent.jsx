import React, { useState } from 'react';
import QAForm from '../Q&AForm/Q&AForm';
import CreateQuiz from '../CreateQuiz/CreateQuiz';

function ParentComponent() {
    const [showQAForm, setShowQAForm] = useState(true);

    const handleCloseQAForm = () => {
        setShowQAForm(false);
    };

    const handleShowCreateQuiz = () => {
        setShowQAForm(false);
    };

    return (
        <div>
            {showQAForm ? (
                <QAForm onClose={handleCloseQAForm} onSubmit={handleShowCreateQuiz} />
            ) : (
                <CreateQuiz />
            )}
        </div>
    );
}

export default ParentComponent;
