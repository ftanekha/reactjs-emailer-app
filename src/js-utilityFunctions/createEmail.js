function createEmail(emailProps){
    const email = document.createElement('table')
    email.className = 'inbox-email-container'

    for(const emailProp in emailProps){
        const row = document.createElement('tr')

            const emailPropName = document.createElement('td')
            emailPropName.textContent = emailProp

            const emailPropContent = document.createElement('td')
            if(emailProp === 'from'){
                emailPropContent.className = 'lowercase'
            }
            if(emailProp === 'subject'){
                emailPropContent.className = 'subject'
            }

             if(emailProp === 'body'){
                emailPropContent.className += 'email-body'
            }

            emailPropContent.textContent = emailProps[emailProp]

            row.append(...[emailPropName, emailPropContent])
            email.appendChild(row)
    }
    
    return email
}

export default createEmail