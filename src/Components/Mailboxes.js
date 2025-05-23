import {useState} from 'react'
import LogoutButton from './LogoutButton.js'
import EmailCard from './EmailCard.js'
import EmailCompositionErrors from './EmailCompositionErrors.js'
import displayMail from '../js-utilityFunctions/displayMail.js'
import {isValidStringInput, isUserEmailAddressValid} from '../js-utilityFunctions/formValidation.js'

function Mailboxes({style, logout}){
    const [drafts, setDrafts] = useState(['Hi, World :)'])
    const [sentMail, setSentMail] = useState([])
    const [displayEmailCard, setDisplayEmailCard] = useState(false)
    const [emailOnDisplay, setEmailOnDisplay] = useState({})

    const emailForm = document.querySelector('#emails-compose')
    const emailToAddress = document.querySelector('#email-to-address')
    const emailSubject = document.querySelector('#email-subject')
    const emailBody = document.querySelector('#email-body')

    const [emailCompositionErrors, setEmailCompositionErrors] = useState([])
    const [emailSentConfirmation, setEmailSentConfirmation] = useState('')
    
    const saveDraft = ()=> {
        setEmailCompositionErrors(prev => [])
        setEmailSentConfirmation('')
        setDrafts([...drafts, emailBody.value])
        emailForm.reset()
    }

    const deleteEmail = (ev)=> {
        ev.stopPropagation()
        const {target} = ev
        target.title = 'delete email'
        if(target.classList.contains('draft')){
            target.className = 'binned-delete-icon draft'
        }else{
            target.className = 'binned-delete-icon'
        }
        document.querySelector('#emails-bin').appendChild(target.parentElement)
    }

    const validateEmail = ({emailToAddress, emailSubject, emailBody})=>{
        const errors = []
        if(emailSubject.length < 2) errors.push('Email subject too short')
        if(emailBody.length < 2) errors.push('Email too short')
        if(!isUserEmailAddressValid(emailToAddress)) errors.push('Invalid email address')
        if(!isValidStringInput(emailSubject)) errors.push('Invalid email subject')
        if(!isValidStringInput(emailBody)) errors.push('Invalid email format')
        
        return errors
    }

    const sendEmail = (ev)=>{
        ev.preventDefault()
        setEmailCompositionErrors(prev => [])
        setEmailSentConfirmation('')
        //in the future, all of the form data would be sent to db
        //for now, send to express server
        const newEmail = {
            emailToAddress: emailToAddress.value,
            emailSubject: emailSubject.value,
            emailBody: emailBody.value
        }
        
        const isEmailDataValid = validateEmail(newEmail)

        if(!isEmailDataValid.length){
            fetch(
                process.env.REACT_APP_RAILWAY_SERVER_URL || 'http://localhost:8080/',
                {
                    method: 'POST',
                    'Content-Type': 'application/json',
                    body: JSON.stringify(newEmail)
                }
            )
            .then(res => {
                if(res.status === 200){
                    setEmailCompositionErrors(prev => [])
                    setEmailSentConfirmation('Email sent')
                    emailForm.reset()
                    return res.json()
                }
            })
            .then(
                emailBody => {
                    setSentMail(prev => [...sentMail, emailBody])
                }
            )
            .catch(err => console.warn(err))
        }else{
            return setEmailCompositionErrors(prev => isEmailDataValid)
        }
    }
    
    const displayCurrentEmail = (email)=> {
        setEmailOnDisplay(prev => ({...email}))
        setDisplayEmailCard(true)
    }

    const closeEmailCard = ()=> {
        setDisplayEmailCard(false)
    }

    const handleChange = ()=>  {
        setEmailCompositionErrors(prev => [])
        setEmailSentConfirmation('')
    }

    return(
        <div className='mailboxes-container' style={style}>
            <EmailCard displayEmailCard={displayEmailCard} emailOnDisplay={emailOnDisplay} closeEmailCard={closeEmailCard}/>
            <div className='mailboxes'>
                <ul>
                    <li id='compose' className='mailbox-link' key='compose' title='create a new email'
                        onClick={displayMail} style={{backgroundColor: '#57ffff', color: 'black'}}>
                        Compose&nbsp;<span className='pencil'>&#128393;</span>
                    </li>
                    <li id='inbox' key='inbox' className='mailbox-link' onClick={displayMail}>Inbox</li>
                    <li id='sent' key='sent' className='mailbox-link' onClick={displayMail}>Sent</li>
                    <li id='drafts' key='drafts' className='mailbox-link' onClick={displayMail}>Drafts</li>
                    <li id='bin' key='bin' className='mailbox-link' title='Bin' onClick={displayMail}></li>
                </ul>
            </div>
            <div className='emails-container'>
                <EmailCompositionErrors errors={emailCompositionErrors}/>
                {emailSentConfirmation && <p style={{width: '80%', margin: '0 auto', color: 'azure', fontWeight: 600}}>{emailSentConfirmation}</p>}
                <form id='emails-compose' className='emails new-email' onSubmit={sendEmail}>
                    <input id='email-to-address' className='form-control' type='email' autoComplete='on' placeholder='To:' onChange={handleChange}/>
                    <input id='email-subject' className='form-control' type='text' autoComplete='on' placeholder='Subject:'onChange={handleChange}/>
                    <textarea id='email-body' className='form-control text-area' onChange={handleChange}></textarea>
                    <div className='submit-button-container'>
                        <button type='submit' className='send-email'>
                            Send&nbsp;&nbsp;<span className='icon-paper-plane-o'></span>
                        </button>
                        <button type='button' className='save-draft' onClick={saveDraft}>Save draft&nbsp;&nbsp;<span className='icon-file-o'></span></button>
                    </div>
                </form>
                <ul id='emails-inbox' className='emails'></ul>
                <ul id='emails-sent' className='emails'>
                    {
                        sentMail.map(
                            (email, i) => {
                                return(
                                    <li key={i} onClick={()=> displayCurrentEmail(email)} title='Click to view email'>
                                        <span><em style={{fontWeight: 500, color: 'gray', marginRight: 16}}>{email.emailToAddress}</em>{`${email.emailSubject}...`}</span> <span title='delete email' className='delete-icon' onClick={deleteEmail}></span>
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
                <ul id='emails-drafts' className='emails'>
                    {
                        drafts.map(
                            (email, i) => {
                                email = Array.from(email)
                                if(email.length > 50)  email.length = 50
                                email = email.join('')
                                return(
                                    <li key={i}>
                                        {email} <span title='delete email' className='delete-icon draft' onClick={deleteEmail}></span>
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
                <ul id='emails-bin' className='emails'></ul>
            </div>
            <LogoutButton className='loginToggleButton logoutButton' logout={logout}/>
        </div>
    )
}

export default Mailboxes