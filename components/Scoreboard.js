import questionList from '../data/questionList'

export default function Scoreboard({currentQuestion}) {
    return(
        <div className="w-max mb-4 lg:mb- mx-auto md:mx-0">
            <h1 className="text-2xl text-gray-600">Progress</h1>
                {currentQuestion < questionList.length ?
                    <div className="flex mt-4">
                        {questionList.map((question, index) => { 
                            return index <= currentQuestion ?
                            <div className="w-4 h-4 mx-4 rounded-full bg-blue-600"></div>
                            :
                            <div className="w-4 h-4 mx-4 rounded-full bg-gray-600"></div>
                        })}
                    </div>
                :
                <div className="flex mt-4">
                    {questionList.map((question, index) => 
                        <div className="w-4 h-4 mx-4 rounded-full bg-green-600"></div>
                    )}
                </div>
                }
        </div>
    )
}