import { useState } from 'react';

function Button({ value , onButtonClick}) {
    // const [value, setValue] = useState(null);

    // function handleClick(){
    //     setValue("X");
    // }
    return (
        <>
            <button onClick={ onButtonClick } className = "square">{ value }</button>
        </>
    );
}

export default Button;
