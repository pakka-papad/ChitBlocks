import React from 'react'
import axios from 'axios'
import { useState } from 'react'



const ChooseScheme = () => {
    const print = () => {
        console.log('hello')
    }

    const [chosen, setChosen] = useState(false)
    console.log(chosen)
    return (
        <>
            <button className="button1"  onClick={() => setChosen(true)}>SCHEME 1</button>
                <button className="button1" style={{display:chosen? 'none' : 'block'}}>SCHEME 2</button>

                <button className="button1" style={{display:chosen? 'none' : 'block'}}>SCHEME 3</button>
        </>
    )
}

export default ChooseScheme