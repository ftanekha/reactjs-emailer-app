import React from 'react'
import LoginButton from './LoginButton.js'
import ReactJSEmailerProjectSummary from './ReactJSEmailerProjectSummary.js'

function LoginForm({handleLoginFormSubmit, setUsername, setPassword, username, password, loginFormDisplay}){
    return(
        <React.Fragment>
            <form id='login-form' onSubmit={handleLoginFormSubmit} style={{display: loginFormDisplay ? 'flex': 'none'}}>
                <input 
                    type='text'  
                    value={username}
                    placeholder='type: random@user.com' 
                    autoComplete='on'
                    onChange={
                        ({target: {value}})=> setUsername(value)
                    }
                />
                <input 
                    type='password' 
                    value={password}
                    placeholder='type: random@password.com'
                    autoComplete='on'
                    onChange={
                        ({target: {value}})=> setPassword(value)
                    }
                />
                <LoginButton/>
            </form>
            <ReactJSEmailerProjectSummary loginFormDisplay={loginFormDisplay}/>
        </React.Fragment>
    )
}

export default LoginForm