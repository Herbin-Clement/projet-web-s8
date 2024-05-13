import { AnswerData } from '../../../Type/interface';


type AnswerProps = {
    id: number,
    data: AnswerData;
}

const Answer = ({ id, data }: AnswerProps) => {

    return (
        <div className="create-answer">
            <div className="create-input">
                <div>Answer {id + 1}</div>
                <input type="text"
                    placeholder="Answer"
                    value={data.text}
                    disabled />
            </div>
            <div className="create-input">
                <div className="create-cb">True</div>
                <input type="checkbox"
                    checked={data.ok}
                    disabled />
            </div>
        </div>
    )
}

export default Answer;