import Dictaphone from '../components/Dictaphone'
import {useState} from 'react'
import questionList from '../data/questionList'
import Options from './Options';
//components
import Scoreboard from './Scoreboard'

export default function Main({currentQuestion, setCurrentQuestion}) {
    const [voiceInput, setVoiceInput] = useState(null);
    const acceptedActions = ['one', 'two', 'three', 'yes', 'no']

    const [questions, setQuestions] = useState(questionList);

    //controls appearance of confirmation modal
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    //stores action value for answer verification
    const [suggestedAnswer, setSuggestedAnswer] = useState(null);

    //trigger listening function from higher function
    const [initListening, setInitListening] = useState(false)

    const validateAnswer = () => {
        if (suggestedAnswer.isTrue) {
            //change option's state
            let newQuestions = questions;
            newQuestions[currentQuestion].options[suggestedAnswer.index].state = 'right';
            setQuestions(newQuestions);

            setShowConfirmationModal(false);
            setTimeout(() => {
                setCurrentQuestion(currentQuestion+1)
            }, 1e3);
        } else {
            //change option's state
            let newQuestions = questions;
            newQuestions[currentQuestion].options[suggestedAnswer.index].state = 'wrong';
            setQuestions(newQuestions);

            setSuggestedAnswer(null)
            setShowConfirmationModal(false);
        }
    }

    const selectYes = () => {
        validateAnswer();
    }

    const selectNo = () => {
        setShowConfirmationModal(false)
        //change option's state
        let newQuestions = questions;
        newQuestions[currentQuestion].options[suggestedAnswer.index].state = 'unselected';
        setQuestions(newQuestions);
        setSuggestedAnswer(null);
    }

    return(
        <div className="w-full md:w-11/12 xl:w-6/12 mx-auto p-4 lg:p-8 rounded shadow bg-gray-200">
            <div className="flex justify-between items-center flex-wrap">
                <Scoreboard currentQuestion={currentQuestion} />
                <Dictaphone setVoiceInput={setVoiceInput} acceptedActions={acceptedActions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
            </div>
            {currentQuestion == -1 &&
            <div className="my-4 flex flex-col">
                <p className="text-center lg:text-xl text-gray-600">When you are ready, click 'Start quiz'.<br/><br/><strong>Now, use your voice.</strong><br/><br/>
                    Say the number of your choice.<br/>Confirm by saying 'yes' or 'no'.</p>
            </div>
            }
            {/* Question + choices */}
            {currentQuestion >= 0 && currentQuestion < questions.length &&
                <div className="my-4 flex flex-col">
                    <p className="text-3xl lg:text-4xl mb-4 text-center">{questions[currentQuestion].name}?</p>
                    {/* {questionList[currentQuestion].options.map((option, index) => 
                        // <QuestionOption option={option} index={index}
                        //     action={action} acceptedActions={acceptedActions}
                        //     answer={answer} setAnswer={setAnswer}
                        //     optionStateChange={optionStateChange} selectOption={selectOption}
                        //     showConfirmationModal={showConfirmationModal} setShowConfirmationModal={setShowConfirmationModal}
                        //     currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
                    )} */}
                    <Options questions={questions} setQuestions={setQuestions}
                        currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
                        showConfirmationModal={showConfirmationModal} setShowConfirmationModal={setShowConfirmationModal}
                        suggestedAnswer={suggestedAnswer} setSuggestedAnswer={setSuggestedAnswer}
                        voiceInput={voiceInput} selectNo={selectNo} selectYes={selectYes} />
                </div>
            }
            {currentQuestion == questions.length &&
                <div className="my-4 flex flex-col">
                    <p className="text-3xl lg:text-4xl text-center">Quiz finished!</p>
                </div>
            }
            {showConfirmationModal &&
            <div className="w-full h-screen absolute top-0 left-0 flex justify-center items-center">
                <div className="p-4 shadow rounded bg-gray-100">
                    <p className="mb-4 text-2xl text-gray-600">Are you sure about that?</p>
                    <div className="flex justify-around">
                        <button className="px-2 py-1 text-xl rounded shadow text-gray-100 bg-green-600"
                            onClick={selectYes} >Yes</button>
                        <button className="px-2 py-1 text-xl rounded shadow text-gray-100 bg-red-600"
                            onClick={selectNo} >No</button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

