import {useEffect} from 'react'
import questionList from '../data/questionList'

export default function Options({questions, setQuestions, currentQuestion, showConfirmationModal, setShowConfirmationModal, suggestedAnswer, setSuggestedAnswer, voiceInput, selectNo, selectYes}) {

    useEffect(() => {
        if (['one', 'two', 'three'].includes(voiceInput) && !showConfirmationModal) {
            setShowConfirmationModal(true)
            //Find option via voice recognition
            let selectedOption = questions[currentQuestion].options.find(x => x.id === voiceInput);
            let selectedOptionIndex = questions[currentQuestion].options.indexOf(selectedOption);

            selectedOption.index = selectedOptionIndex;
            setSuggestedAnswer(selectedOption)
            //change option's state
            let newQuestions = questions;
            newQuestions[currentQuestion].options[selectedOptionIndex].state = 'selected';
            setQuestions(newQuestions);
        } else if (voiceInput === 'no') {
            selectNo()
        } else if (voiceInput === 'yes') {
            selectYes()
        }
    }, [voiceInput])

    const selectOption = (option, index) => {
        setShowConfirmationModal(true)
        option.index = index;
        setSuggestedAnswer(option)
        //change option's state
        let newQuestions = questions;
        newQuestions[currentQuestion].options[index].state = 'selected';
        setQuestions(newQuestions);
    }

    return(
        <div>
            {questionList[currentQuestion].options.map((option, index) => 
                <div>
                    {option.state === 'unselected' &&
                        <p className="px-4 lg:px-8 py-4 text-2xl lg:text-4xl text-gray-800 rounded shadow bg-gray-300"
                            onClick={() => selectOption(option, index)}>{option.name}</p>
                    }
                    {option.state === 'selected' &&
                        <p className="px-4 lg:px-8 py-4 text-2xl lg:text-4xl rounded shadow bg-blue-400">{option.name}</p>
                    }
                    {option.state === 'wrong' &&
                        <p className="px-4 lg:px-8 py-4 text-2xl lg:text-4xl rounded shadow bg-red-400">{option.name}</p>
                    }
                    {option.state === 'right' &&
                        <p className="px-4 lg:px-8 py-4 text-2xl lg:text-4xl rounded shadow bg-green-400">{option.name}</p>
                    }
                </div>    
            )}
        </div>
    )
}