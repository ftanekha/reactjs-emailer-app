import React from 'react'
import LoginButton from './LoginButton.js'
import LogInErrorMessages from './LogInErrorMessages.js'
import ReactJSEmailerProjectSummary from './ReactJSEmailerProjectSummary.js'

function LoginForm({handleLoginFormSubmit, setUsername, setPassword, username, password, loginFormDisplay, isUsernameValid, isPasswordValid}){
    return(
        <React.Fragment>
            <main>
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
                <LogInErrorMessages isUsernameValid={isUsernameValid} isPasswordValid={isPasswordValid}/>
                <ReactJSEmailerProjectSummary loginFormDisplay={loginFormDisplay}/>
            </main>
             {
                loginFormDisplay
                    &&
                <footer>
                    <a 
                        href={`${process.env.REACT_APP_MY_GITHUB_ACCOUNT}`}
                        target='_blank' 
                        rel='noopener noreferrer'
                    >
                        View my GitHub page <span>↗</span>
                    </a>
                </footer>
             }
        </React.Fragment>
    )
}

export default LoginForm