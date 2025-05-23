export default function EmailCard({displayEmailCard, emailOnDisplay, closeEmailCard}){
    const {emailToAddress, emailSubject, emailBody} = emailOnDisplay

    const style = {
        display: displayEmailCard ? 'block' : 'none',
        height: displayEmailCard ? '50vh' : 0,
        zIndex: displayEmailCard ? 1000 : 0
    }
    
    return(
        <div className='email-card-container' style={style}>
            <span className='close-email-card' title='Close email card' onClick={closeEmailCard}>x</span>
            <table className='email-card'>
                <thead></thead>
                <tbody>
                    <tr>
                        <td>To</td>
                        <td className='lowercase'>{emailToAddress}</td>
                    </tr>
                    <tr>
                        <td>subject</td>
                        <td className='subject'>{emailSubject}</td>
                    </tr>
                    <tr>
                        <td>body</td>
                        <td className='email-body'>{emailBody}</td>
                    </tr>
                </tbody>
        </table>
        </div>
    )
}