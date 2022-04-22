import {Button, Card} from "react-bootstrap";
import './UserControl.css'
const UserControl = (props) => {
    const{answerState, chosenOption, setMoveToNxtQues, setToggler, toggler} = props

    function moveToNextQues() {
        setMoveToNxtQues(true)
        setToggler(!toggler)
    }

    if(answerState === "correct") {
        return(
            <Card >
                <Card.Body className = "correct">
                    <Card.Text>
                        {chosenOption} is the correct answer
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="outline-primary" onClick={moveToNextQues}>Next</Button>
                </Card.Footer>
            </Card>
        )
    } else if (answerState === "wrong") {
        return(
            <Card>
                <Card.Body className = "wrong">
                    <Card.Text>
                        {chosenOption} is the wrong answer
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="outline-primary" onClick={moveToNextQues}>Next</Button>
                </Card.Footer>
            </Card>
        )
    } else {
        return(
            <Card >
                <Card.Body>
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                </Card.Footer>
            </Card>
        )
    }
}

export default UserControl