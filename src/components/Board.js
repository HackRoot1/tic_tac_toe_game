import { useState } from "react";
import Button from "./buttons";

function Board() {
    const [xIsNext, setIsNext] = useState(true);
    const [buttons, setButtons] = useState(Array(9).fill(null));

    
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

    const winner = calculateWinner(buttons);
    let status;
    if(winner){
        status = "Winner: "+ winner;
    }else{
        status = "Next Player: " + (xIsNext ? "X" : "O");
    }

    function handleClick(i){
        // not allowed to click on same square
        if(buttons[i] || calculateWinner(buttons)){
            return;
        }
        const nextButtons = buttons.slice();
        // changing X and O for flipping players
        if(xIsNext){
            nextButtons[i] = 'X';
        }else{
            nextButtons[i] = 'O';
        }
        // for setting value
        setButtons(nextButtons);

        // for setting xIsNext in true or false this will help above logic to perform
        setIsNext(!xIsNext);
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



export default Board;
