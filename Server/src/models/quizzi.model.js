const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    options: {
        type: [
            {
                text: {
                    type: String,
                    required: true,
                },
                imageURL : {
                    type: String,
                    default: null,
                },
            },
        ],
        require: true,
        validate: {
            validator: function (value) {
                return value.length >= 2 && value.length <= 5;

            },
            message: 'Option should be array with at least 2 and at most 5 option',
        },
    },
    answer: {
        type: String,
        default: null,
    },
    optionType: {
        type: String,
        enum: ['Text', 'Image URL', 'Text & Image URL'],
        required: true,
    },
    selectedCount: {
        type: Number,
        default : 0,
    },
});

const quizSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    }, 
    quizType: {
        type: String,
        enum: ['Q&A', 'Poll'],
        required: true,
    },
    timer: {
        type: Number,
        default: null,
    },
    impressionCount: {
        type: Number,
        default: 0,
    },
    questions: {
        type: [questionSchema],
        validate: {
            validator: function (value) {
                return value.length >= 1 && value.length <=5;
            },
            message: 'A quize should have at least 1 and at most 5 questions.'
        },
    },
    shareableLink: {
        type: String,
        default: null,
    },
    isTrending: {
        type: Boolean,
        default: false,
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;