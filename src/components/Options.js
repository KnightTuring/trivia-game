import { Button } from "react-bootstrap"
import { ButtonGroup } from "react-bootstrap"
import {useEffect, useState} from "react"
import { motion, MotionConfig } from "framer-motion";
import './Options.css'
const Options = (props) => {
    const {allOptions, setSelectedOption, disableOptions} = props
    const [disable, setDisable] = useState(false)
    function optionSelected(e) {
        // on button click set selected option
        setSelectedOption(e.target.innerHTML)
    }


    if(disableOptions) {
        return (
            <ButtonGroup className="btn-group" vertical>
                {
                    allOptions.map((item) => <motion.button className="disabled">{item}</motion.button>)
                }
            </ButtonGroup>
        )
    } else {
        return(
            <ButtonGroup vertical>
                {
                    allOptions.map((item) => <motion.button whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }} className="btn-option" onClick={optionSelected}>{item}</motion.button>)
                }
            </ButtonGroup>
        )
    }
}

export default Options