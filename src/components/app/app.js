import React from 'react'
import List from '../list'

import './app.css'

const App = () => {
    const spaceFooter = {
        width: '100%',
        height: '80px'
    }
    return (
        <div className="app">
            <List key={-1}/>
            <div style={spaceFooter}> </div>
        </div>
    );
}

export default App

