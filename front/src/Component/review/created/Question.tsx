import Answer from './Answer';
import Line from '../../utils/Line';

import { QuestionData } from '../../../Type/interface';


interface QuestionProps {
    id: number,
    data: QuestionData,
}

const Question = ({ id, data }: QuestionProps) => {

    return (
        <div className="create-question">
            <div className="create-input">
                <div>Question {id + 1}</div>
                <input className="create-input-question"
                    type="text"
                    placeholder="Question"
                    value={data.question}
                    disabled />
            </div>
            {data.answers.map((answer, id) => (
                <Answer key={id}
                    id={id}
                    data={answer} />
            ))}
            <Line />
        </div>
    )
}

export default Question;