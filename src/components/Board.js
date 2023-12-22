import { useState } from "react";
import Button from "./buttons";

function Board({xIsNext, buttons, onPlay}) {
    function handleClick(i){
        if(buttons[i] || calculateWinner(buttons)){
            return;
        }
        const nextButtons = buttons.slice();
        if(xIsNext){
            nextButtons[i] = 'X';
        }else{
            nextButtons[i] = 'O';
        }
        onPlay(nextButtons);
    }

    const winner = calculateWinner(buttons);
    let status;
    if(winner){
        status = "Winner: "+ winner;
    }else{
        status = "Next Player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <div className="status">{ status }</div>
            <div className = "board-row">
                <Button onButtonClick={ () => handleClick(0) } value = { buttons[0] } />
                <Button onButtonClick={ () => handleClick(1) } value = { buttons[1] }  />
                <Button onButtonClick={ () => handleClick(2) } value = { buttons[2] }  />
            </div>
            <div className = "board-row">
                <Button onButtonClick={ () => handleClick(3) } value = { buttons[3] }  />
                <Button onButtonClick={ () => handleClick(4) } value = { buttons[4] }  />
                <Button onButtonClick={ () => handleClick(5) } value = { buttons[5] }  />
            </div>
            <div className = "board-row">
                <Button onButtonClick={ () => handleClick(6) } value = { buttons[6] }  />
                <Button onButtonClick={ () => handleClick(7) } value = { buttons[7] }  />
                <Button onButtonClick={ () => handleClick(8) } value = { buttons[8] }  />
            </div>
        </>
    );
}


    
    // logic to calculate winner
    function calculateWinner(buttons) {
        const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (buttons[a] && buttons[a] === buttons[b] && buttons[a] === buttons[c]) {
            return buttons[a];
        }
        }
        return null;
    }



function Game(){
    // const [xIsNext, setIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentButtons = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextButtons){
        const nextHistory = [...history.slice(0, currentMove + 1), nextButtons];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }


    function jumpTo(nextMove){
        setCurrentMove(nextMove);
        if(nextMove === 0){
            setCurrentMove(nextMove);
        }
    }

    const moves = history.map((buttons, move) => {
        let description;

        if(move > 0){
            description = "Go to move #" + move;
        }else{
            description = "Go to game start";
        }

        return (
            <li key = { move }>
                <button onClick = { () => jumpTo(move) }>
                    { description }
                </button>
            </li>
        )
    });

    return (
        <>
            <div className="game">
                <div className="title">
                    <div>
                        <button className="btn" onClick = { () => jumpTo(0) }>
                            Replay
                        </button>
                    </div>
                </div>

                <div>
                    <Board xIsNext = { xIsNext } buttons = { currentButtons }  onPlay = { handlePlay } />
                </div>
                <div className="history">
                    <div className="title">History</div>
                    <ol>{ moves }</ol>
                </div>
            </div>
        </>
    );  

}



export default Game;
