

function EndScreen({winner, restartGame}){
    return (
        <>
        <h1> ended</h1>
        <p> winner = {winner}</p>
        <button onClick={() => {restartGame()}}>
            restart
        </button>
        </>
    )
}

export default EndScreen