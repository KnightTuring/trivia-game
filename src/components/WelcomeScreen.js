import { useState } from "react"
import { Button } from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { Col } from "react-bootstrap"
import { motion, MotionConfig } from "framer-motion";
import {atob} from "atob"
import GameViewer from "./GameViewer"

import './WelcomeScreen.css'
import '../utils'
import {fetchFromApi, shuffleArray} from "../utils"
import ScoreBoard from "./ScoreBoard";

const WelcomeScreen  = (props) => {

    const [startBtnState, setStartBtnState] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allData, setAllData] = useState([])
    const [scoreData, setScoreData] = useState([])
    const [gameEnd, setGameEnd] = useState(false)
    function startBtnClicked() {
        fetchFromApi(setLoading, apiRespToJson)

    }

    function apiRespToJson(apiData) {
        /* 
            allData = [
                {
                    'question':'this is the question',
                    'options': ['option 1','option 2', 'option 3'],
                    'correct_answer': 'option 2'
                },
                {
                    'question':'this is the second question',
                    'options': ['option a','option b', 'option c'],
                    'correct_answer': 'option a'
                }
            ]
        */
        let formattedArr = []
        let atob = require('atob');
        console.log("API resp:", apiData)
        console.log("API len:", apiData.results.length)
        let apiResults = apiData.results
        for(let i=0; i<apiResults.length;i++) {
            console.log("Iterating")
            console.log(i)
            let question = atob(apiResults[i].question)
            let incorrectAnswers = apiResults[i].incorrect_answers
            let incorrectOptions = []
            for(let option in incorrectAnswers) {
                incorrectOptions.push(atob(incorrectAnswers[option]))
            }
            let correct = atob(apiResults[i].correct_answer)
            let all_options = incorrectOptions.concat(correct)
            all_options = shuffleArray(all_options)
            formattedArr.push({'question': question,
                'all_options': all_options,
                'correct_option': correct})
        }
        console.log(formattedArr)
        setAllData(formattedArr)
        setStartBtnState(true)
    }

    if(gameEnd === true) {
        return (
            <ScoreBoard
                scoreData = {scoreData}
                setGameEnd = {setGameEnd}
            />
        )
    } else if(startBtnState === true) {
        return(
            <GameViewer
                allData = {allData}
                setGameEnd = {setGameEnd}
                setScoreData = {setScoreData}
            />
        )
    } else {
        return(
            <Container
                fluid
                className="titleContainer"
            >
                <Row>
                    <Col>
                        <motion.div>
                            <motion.h1
                                initial={{ x: -1000 }}
                                animate={{ x: 0 }}
                                transition={{
                                    type: "tween",
                                    duration: "2",
                                    delay: "0.5"
                                }}>
                                The <br/> Trivia <br/> Game
                            </motion.h1>
                        </motion.div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <motion.button
                            className="btn"
                            whileHover={{ scale: 1.4 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={startBtnClicked}
                        >
                            Start
                        </motion.button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default WelcomeScreen