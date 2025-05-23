import createEmail from './createEmail.js'

export default function displayMail({target}){
    const aquamarine = '#57ffff'

    const mailboxLinks = document.querySelectorAll('.mailbox-link')
    const mailboxes = document.querySelectorAll('.emails')

    mailboxLinks.forEach(
        mailboxLink => {
            if(mailboxLink !== target && mailboxLink.style.color !== 'azure') mailboxLink.style.color = 'azure'
        }
    )
    target.style.color = aquamarine
    //display emails
    const targetEmails = document.querySelector(`#emails-${target.id}`)

    mailboxes.forEach(
        mailbox => {
            if(mailbox !== targetEmails) {
                mailbox.style.display = 'none'
            }else{
                if(target.id === 'compose'){
                    mailbox.style.display = 'flex'
                }else{
                    mailbox.style.display = 'block'
                }
            }
        }
    )
    //fetch new random emails
    if(target.id === 'inbox'){
        targetEmails.innerHTML = ''

        fetch('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.json())
        .then(
            comments => {
                //generate 6 random emails
                let startPos = Math.floor(Math.random() * comments.length)
                // kee the start position within practical range
                if(startPos > comments.length - 6) startPos = comments.length - 6
                if(startPos < 6) startPos = 0
                //
                comments = comments.slice(startPos, startPos + 6)
                //
                comments.forEach(
                    ({name: subject, email: from, body}, i) => {
                        const li = document.createElement('li')
                        li.key = i
                        li.className = 'inbox-email'
                        //generate email body
                        const newEmail = createEmail({from, subject, body})
                        //add delete icon
                        const deleteIcon = document.createElement('span')
                        deleteIcon.title = 'delete email'
                        deleteIcon.className = 'delete-icon'
                        deleteIcon.addEventListener(
                            'click', (ev)=> {
                                ev.stopPropagation()
                                ev.target.className = 'binned-delete-icon'
                                document.querySelector('#emails-bin').appendChild(ev.target.parentElement)
                            }, {once: true}
                        )
                        li.appendChild(newEmail)
                        li.appendChild(deleteIcon)
                        targetEmails.appendChild(li)
                    }
                )
            },
            err => console.warn(err.message)
        )
        targetEmails.style.display = 'block'
    }
    //binned emails
    const binnedDeleteIcons = document.querySelectorAll('.binned-delete-icon')
    binnedDeleteIcons.forEach(
        binnedDeleteIcon => binnedDeleteIcon.addEventListener(
            //delete permanently from DOM
            'click', (event)=> {
                if(window.confirm('Are you sure you want to delete this email permanently?')){
                    event.stopPropagation()
                    if(event.currentTarget.classList.contains('draft')){
                        event.currentTarget.parentElement.remove()
                    }else{
                        event.target.parentElement.remove()
                    }
                }
            }, {once: true}
        )
    )
}