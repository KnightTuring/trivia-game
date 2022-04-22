import {Button, Table} from "react-bootstrap";
import './Scoreboard.css'
import scoreboardPicture from '../assets/thats_all.png'

const ScoreBoard = (props) => {

    const {scoreData, setGameEnd} = props
    let correctCount = scoreData[0].correct
    let wrongCount = scoreData[0].wrong
    return(
        <>
            <div className="scoreboard">
               <img src={scoreboardPicture} />
                <Table strip bordered hover size = "sm" responsive>
                    <tbody>
                        <tr>
                            <td>Correct answers</td>
                            <td>{correctCount}</td>
                        </tr>
                        <tr>
                            <td>Wrong answers</td>
                            <td>{wrongCount}</td>
                        </tr>
                    </tbody>
                </Table>
                    <Button variant="outline-primary" onClick={() => window.location.reload(false)}>Play again</Button>


            </div>


        </>
    )
}

export default ScoreBoard