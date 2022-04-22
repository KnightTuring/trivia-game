import { useEffect, useState } from "react"
import {Container, Stack} from "react-bootstrap"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"
import { motion, MotionConfig } from "framer-motion";
import './GameViewer.css'

import Options from './Options.js'
import UserControl from "./UserControl";

const GameViewer = (props) => {

    const {allData, setGameEnd, setScoreData} = props

    let totalCount = allData.length
    const [optionList, setOptionList] = useState(allData[0].all_options)
    const [questionText, setQuestion] = useState(allData[0].question)
    const [selectedOption, setSelectedOption] = useState('')
    const [correctOption, setCorrectOption] = useState(allData[0].correct_option)
    const [counter, setCount] = useState(1)
    const [answerState, setAnswerState] = useState("")
    const [moveToNxtQues, setMoveToNxtQues] = useState(false)
    const [disableOptions, setDisableOptions] = useState(false)
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0)
    const [wrongAnswerCount, setWrongAnswerCount] = useState(0)
    const [toggler, setToggler] = useState(false)

    useEffect(() => {
        if(selectedOption) {
            // if selected option is not null
            // check if it is the right answer
            // if yes move to next question
            console.log("Option selected: "+selectedOption)
            if(selectedOption === correctOption) {
                console.log("Correct!")
                // set card to green
                setCorrectAnswerCount(correctAnswerCount + 1)
                setAnswerState("correct")
            } else {
                console.log("Wrong")
                setWrongAnswerCount(wrongAnswerCount + 1)
                setAnswerState("wrong")
            }
            setDisableOptions(true)
        }
    }, [selectedOption])

    useEffect( () => {
        console.log("Counter "+counter)
        console.log("total count"+totalCount)
        if(counter >= totalCount ) {
            setScoreData([{'correct': correctAnswerCount, 'wrong': wrongAnswerCount}])
            setGameEnd(true)
        } else {
            if(moveToNxtQues) {
                console.log("Moving to next question"+ (counter))
                setDisableOptions(false)
                setCount(counter + 1)
                setQuestion(allData[counter].question)
                setOptionList(allData[counter].all_options)
                setCorrectOption(allData[counter].correct_option)
                setMoveToNxtQues(false)
                setAnswerState("")
            }
        }
    }, [toggler])

    return (
        <Container fluid className="questionBox">
            <Row>
                <Col>
                    <h3>Question {counter} of {totalCount}</h3>
                </Col>
            </Row>
            <Row>
                <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 1.2}}>
                    <Stack gap={2}>
                        <h5>{questionText}</h5>
                        <Options
                            allOptions = {optionList}
                            setSelectedOption = {setSelectedOption}
                            disableOptions = {disableOptions}
                        />
                        <UserControl
                            answerState = {answerState}
                            chosenOption = {selectedOption}
                            setMoveToNxtQues = {setMoveToNxtQues}
                            setToggler = {setToggler}
                            toggler = {toggler}
                        />
                    </Stack>
                </motion.div>
            </Row>
        </Container>
    )
}

export default GameViewer