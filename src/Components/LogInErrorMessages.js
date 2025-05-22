function LogInErrorMessages({isUsernameValid, isPasswordValid}){
    return (
        <ul id='login-error-messages-container' style={{display: !isUsernameValid || !isPasswordValid ? 'block' : 'none'}}>
            {!isUsernameValid && <li style={{textAlign: 'center'}}>Invalid username!</li>}
            {!isPasswordValid && <li style={{textAlign: 'center'}}>Invalid password!</li>}
        </ul>
    )
}

export default LogInErrorMessages