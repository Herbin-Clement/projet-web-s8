import Line from '../../utils/Line';
import Question from './Question';
import { QuizzDataReview } from '../../../Type/interface';

interface ReviewCreatedProps {
    data: QuizzDataReview;
}

const ReviewCreated = ({ data }: ReviewCreatedProps) => {

    return (
        <div className="create">
            <div className="create-content">
                <div className="create-title">
                    <div className="create-input">
                        <div>Titre du Quizz</div>
                        <input type="text" placeholder="Quizz" value={data.title} disabled />
                    </div>
                </div>
                <Line />
                {data.questions.map((question, id) => (
                    <Question key={id}
                        id={id}
                        data={question} />
                ))}
            </div>
        </div>
    )
}

export default ReviewCreated;