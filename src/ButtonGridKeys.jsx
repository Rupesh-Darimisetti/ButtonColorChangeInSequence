import { useEffect, useRef, useState } from "react";

function ButtonGridKeys() {
    const [buttonColors, setButtonColors] = useState(Array(9).fill('gray'));
    const [order, setOrder] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const intervalRef = useRef(null)//to track the interval safely

    const handleClick = (index) => {
        if (buttonColors[index] === 'green' || isProcessing) return;

        const newColors = [...buttonColors]
        newColors[index] = 'green';
        setButtonColors(newColors)

        const newSequence = [...order, index]
        setOrder(newSequence)

        if (newSequence.length === 9) {
            startDesequence(newSequence);
        }
    }
    const resetColor = () => {
        clearInterval(intervalRef.current);
        setButtonColors(Array(9).fill('gray'))
        setOrder([]);
        setIsProcessing(false)
    }

    const startDesequence = (sequence) => {
        setIsProcessing(true);
        let currentSequence = [...sequence]

        intervalRef.current = setInterval(() => {
            // stops the loop
            if (currentSequence.length === 0) {
                clearInterval(intervalRef.current);
                setIsProcessing(false)
                setOrder([])
                return;
            }
            // remove element at first 
            const firstIndex = currentSequence.shift()
            setButtonColors(prevColor => {
                const updated = [...prevColor]
                updated[firstIndex] = 'red';
                return updated;
            })
        }, 1000)

    }
    // cleanup on unmount
    useEffect(() => {
        return () => clearInterval(intervalRef.current)
    }, [])
    return (
        <>
            <div style={styles.container}>
                <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1>Change button colors</h1>
                    <p >In this page the sequence of button changes color on the order you typed from start to end</p>
                </header>
                <div style={styles.grid}>
                    {buttonColors.map((color, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(index)}
                            style={{
                                ...styles.button,
                                backgroundColor: color,
                                transform: buttonColors[index] === 'green' ? 'scale(0.95)' : 'scale(1)',
                                transition: 'background-colo 0.2s, transform 0.5s'
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button style={styles.resetBtn} onClick={resetColor}>Reset colors</button>
            </div >
        </>
    )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        padding: '20px',
        background: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    button: {
        width: '80px',
        height: '80px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        color: 'white'
    },
    resetBtn: {
        marginTop: '30px',
        padding: '10px 24px',
        borderRadius: '20px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        backgroundColor: 'white'
    }
};
export default ButtonGridKeys;