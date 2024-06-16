import React from 'react'

// function Greet(){
//     return <h1>Hello Balls</h1>
// }

interface GreetProps{
    name: string;
}

const Greet: React.FC<GreetProps> = ({name}) => {
    return (
    <h1>Hello {name}</h1>
    )
}

export default Greet