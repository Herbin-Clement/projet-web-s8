import './create.css';

const CreateAnswer = () => {
    return (
        <div className="createAnswer">
            <div className="quizzInput">
                <div>Answer</div>
                <input type="text" placeholder="Answer"/>
            </div>
            <div className="quizzInput">
                <div className="quizzCheckboxName">True</div>
                <input type="checkbox"/>
            </div>
        </div>
    )
}

export default CreateAnswer;