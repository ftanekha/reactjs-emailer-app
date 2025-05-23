import {useState, useEffect} from 'react'

export default function ReactJSEmailerProjectSummary({loginFormDisplay}) {
    const [projectSummarySeen, setProjectSummarySeen] = useState(false)

    useEffect(
        ()=>{
            if(!window.localStorage.getItem('projectSummarySeen')){
                window.localStorage.setItem('projectSummarySeen', 'yes')
            }else if(window.localStorage.getItem('projectSummarySeen') === 'yes'){
                setProjectSummarySeen(true)
            }
        }, [loginFormDisplay]
    )

    return (
        <section className='project-summary' style={{display: (loginFormDisplay && !projectSummarySeen) ? 'block': 'none' }}>
            <h2>📘 About This Project</h2>
            <p>
                <u>React.js Emailer</u> is a simulated email client built with <strong>React.js</strong> on the frontend and <strong>Express.js</strong> on the backend.
            </p>
            <p>
                The app features user login, email composition, and inbox management, allowing users to interact with emails, send them, save drafts, and delete them. The app is responsive, lightweight (~1.5MiB), and uses a green/azure/black color theme.
            </p>
            <p>
                🧪 <strong>Mailboxes & Features:</strong> Includes five mailboxes: 'Compose', 'Inbox', 'Sent', 'Drafts', and 'Bin'. It uses the <strong>JSONPlaceholder API</strong> to populate the inbox with random emails and simulates sending, saving, and deleting emails through API calls.
            </p>
            <p>
                🧪 <strong>Form Validation & Error Handling:</strong> Each mailbox supports robust form validation with error messages, ensuring that only valid data is submitted. It also includes success and error message handling for better UX.
            </p>
            <p>
                🧪 <strong>Express.js Backend:</strong> The backend simulates email sending and receiving via HTTP requests, logs the data, validates it, and returns the result to the frontend for display.
            </p>
        </section>
    )
}
