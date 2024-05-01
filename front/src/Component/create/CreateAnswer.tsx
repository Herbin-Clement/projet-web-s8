import './create.css';

const CreateAnswer = () => {
    return (
        <div className="create-answer">
            <div className="create-input">
                <div>Answer</div>
                <input type="text" placeholder="Answer"/>
            </div>
            <div className="create-input">
                <div className="create-cb">True</div>
                <input type="checkbox"/>
            </div>
        </div>
    )
}

export default CreateAnswer;