
function Button({ value , onButtonClick}) {
    
    return (
        <>
            <button onClick={ onButtonClick } className = "square">{ value }</button>
        </>
    );
}

export default Button;
