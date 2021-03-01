import Dictaphone from '../components/Dictaphone'
import {useEffect, useState} from 'react'
import questionList from '../data/questionList'

export default function Main() {
    const [action, setAction] = useState(null);
    const acceptedActions = ['one', 'two', 'three', 'yes', 'no']

    const [currentQuestion, setCurrentQuestion] = useState(0);

    //controls appearance of confirmation modal
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    return(
        <div className="w-full md:w-11/12 xl:w-6/12 p-8 rounded shadow bg-gray-200">
            <div className="text-center">
                <Dictaphone setAction={setAction} acceptedActions={acceptedActions} />
            </div>
            {/* Header */}
            <p className="text-4xl text-center">{questionList[currentQuestion].name}?</p>
            {/* Choices */}
            <div className="mt-8 flex flex-col">
                {questionList[currentQuestion].options.map((option, index) => 
                    <Item option={option} index={index}
                        action={action} acceptedActions={acceptedActions}
                        showConfirmationModal={showConfirmationModal} setShowConfirmationModal={setShowConfirmationModal}
                        currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
                )}
            </div>
        </div>
    )
}

const Item = ({option, index, action, acceptedActions, setCurrentQuestion, currentQuestion, showConfirmationModal, setShowConfirmationModal}) => {
    const [optionState, setOptionState] = useState('unselected')

    //stores action value for answer verification
    const [answer, setAnswer] = useState(null);

    useEffect(() => {
        if (action === option.id || answer === option.id) {
            if (acceptedActions.includes(action) && !showConfirmationModal) {
                setShowConfirmationModal(true);
                setOptionState('selected')
                setAnswer(action);
            } else if (action == 'yes') {
                setShowConfirmationModal(false);
                validateAnswer()
                setAnswer(null);
            } else if(action == 'no') {
                setShowConfirmationModal(false);
                setOptionState('unselected')
                setAnswer(null);
            }
        }
    }, [action])

    useEffect(() => {
        setOptionState('unselected')
     }, [currentQuestion])

    const validateAnswer = () => {
        if (option.isTrue) {
            setOptionState('right');
            setShowConfirmationModal(false);
            setTimeout(() => {
                setCurrentQuestion(currentQuestion+1)
            }, 1e3);
        } else {
            setOptionState('wrong');
            setShowConfirmationModal(false);
        }
    }

    return (
        <div className="mb-4 w-full">
            {optionState === 'unselected' &&
                <p className='px-4 lg:px-8 py-4 text-4xl text-gray-800 rounded shadow bg-gray-300' style={{border: '1px solid #999'}}>{`${index+1}. ${option.name}`}</p>
            }
            {optionState === 'selected' &&
                <p className='px-4 lg:px-8 py-4 text-4xl rounded shadow bg-blue-400' style={{border: '1px solid #999'}}>{`${index+1}. ${option.name}`}</p>
            }
            {optionState === 'right' &&
                <p className='px-4 lg:px-8 py-4 text-4xl rounded shadow bg-green-400' style={{border: '1px solid #999'}}>{`${index+1}. ${option.name}`}</p>
            }
            {optionState === 'wrong' &&
                <p className='px-4 lg:px-8 py-4 text-4xl rounded shadow bg-red-400' style={{border: '1px solid #999'}}>{`${index+1}. ${option.name}`}</p>
            }
            {showConfirmationModal &&
            <div className="w-full h-screen absolute top-0 left-0 flex justify-center items-center">
                <div className="p-4 shadow rounded bg-gray-100">
                    <p className="mb-4 text-2xl text-gray-600">Are you sure about that?</p>
                    <div className="flex justify-around">
                        <button className="px-2 py-1 text-xl rounded shadow text-gray-100 bg-green-600">Yes</button>
                        <button className="px-2 py-1 text-xl rounded shadow text-gray-100 bg-red-600">No</button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}