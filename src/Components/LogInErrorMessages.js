function LogInErrorMessages({isUsernameValid, isPasswordValid}){
    const liStyle = {textAlign: 'center', fontSize: 12}
    return (
        <ul id='login-error-messages-container' style={{display: !isUsernameValid || !isPasswordValid ? 'block' : 'none'}}>
            {!isUsernameValid && <li style={liStyle}>Invalid username!</li>}
            {!isPasswordValid && <li style={liStyle}>Invalid password!</li>}
        </ul>
    )
}

export default LogInErrorMessages