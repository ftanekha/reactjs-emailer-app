import React, {useState} from 'react'
import LogoutButton from './LogoutButton.js'
import displayMail from '../js-utilityFunctions/displayMail.js'
import {isValidStringInput, isUserEmailAddressValid} from '../js-utilityFunctions/formValidation.js'

function Mailboxes({style, logout}){
    const [drafts, setDrafts] = useState(['Hi, World :)'])
    const [sentMail, setSentMail] = useState([])

    const emailForm = document.querySelector('#emails-compose')
    const emailToAddress = document.querySelector('#email-to-address')
    const emailSubject = document.querySelector('#email-subject')
    const emailBody = document.querySelector('#email-body')

    const saveDraft = ()=> {
        setDrafts([...drafts, emailBody.value])
        emailForm.reset()
    }

    const deleteEmail = ({target})=> {
        target.title = 'delete draft'
        if(target.classList.contains('draft')){
            target.className = 'binned-delete-icon draft'
        }else{
            target.className = 'binned-delete-icon'
        }
        document.querySelector('#emails-bin').appendChild(target.parentElement)
    }

    const validateEmail = ({emailToAddress, emailSubject, emailBody})=>{
        const errors = []
        if(!isUserEmailAddressValid(emailToAddress)) errors.push('Invalid email address')
        if(!isValidStringInput(emailSubject)) errors.push('Invalid email subject')
        if(!isValidStringInput(emailBody)) errors.push('Invalid email format')
        
        return errors
    }

    const sendEmail = (ev)=>{
        ev.preventDefault()
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
                'https://ihzcsotyrk.eupar04.qoddiapp.com',
                {
                    method: 'POST',
                    'Content-Type': 'application/json',
                    body: JSON.stringify(newEmail)
                }
            )
            .then(res => {
                if(res.status === 200 && res.body){
                    console.info('message sent')
                    emailForm.reset()
                    return res.text()
                }
            })
            .then(emailBody => setSentMail([...sentMail, emailBody]))
            .catch(err => console.warn(err))
        }else{
            console.table(isEmailDataValid)
        }
    }
    
    return(
        <div className='mailboxes-container' style={style}>
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
                <form id='emails-compose' className='emails new-email' onSubmit={sendEmail}>
                    <input id='email-to-address' className='form-control' type='email' placeholder='To:'/>
                    <input id='email-subject' className='form-control' type='text' placeholder='Subject:'/>
                    <textarea id='email-body' className='form-control text-area'></textarea>
                    <div className='submit-button-contaier'>
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
                                //shorten email
                                email = Array.from(email)
                                if(email.length > 50)  email.length = 50
                                email = email.join('')
                                //
                                return(
                                    <li key={i}>
                                        {email} <span title='delete email' className='delete-icon' onClick={deleteEmail}></span>
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