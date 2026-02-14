import { useState } from "react";

function ButtonGridKeys() {
    const [buttonColors, setButtonColors] = useState(Array(9).fill(9).fill('gray'));
    const [order, setOrder] = useState([]);

    const handleClick = (index) => {
        if (buttonColors[index] === 'green') {
            return;
        }

        const newColors = [...buttonColors]
        newColors[index] = 'green';
        setButtonColors(newColors)

        const newSequence = [...order, index]
        setOrder(newSequence)

        if (newSequence.length === 9) {
            deselectInReverse(newSequence);
            setOrder([])
            setButtonColors(Array(9).fill('gray'))
        }
    }
    const resetColor = () => {

        setButtonColors(Array(9).fill('gray'))
    }
    const deselectInReverse = (sequence) => {
        let currentSequence = [...sequence]
        const intervalId = setInterval(() => {
            // stops the loop
            if (currentSequence.length === 0) {
                clearInterval(intervalId);
                return;
            }
            // remove element at first 
            const firstIndex = currentSequence.shift()
            setButtonColors(prevColor => {
                const newColors = [...prevColor]
                newColors[firstIndex] = 'red';
                return newColors;
            })
            currentSequence = [...currentSequence]
        }, 1000)

    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h1>Change button colors</h1>
                <p style={{ padding: '10px' }}>In this page the sequence of button changes color on the order you typed from start to end</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', width: '300px' }}>
                    {buttonColors.map((color, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(index)}
                            style={{
                                backgroundColor: color,
                                height: '100px',
                                width: '100px',
                                border: '2px solid black',
                                cursor: 'pointer',
                                borderRadius: '5px'
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button style={{ padding: '10px', margin: '10px' }} onClick={resetColor}>Reset colors</button>
            </div >
        </>
    )
}
export default ButtonGridKeys;