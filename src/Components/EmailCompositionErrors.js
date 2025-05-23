export default function EmailCompositionErrors({errors}){
    const ulStyle = {
        transition: '2s',
        visibility: errors.length ? 'visible' : 'hidden',
        // listStyle: 'none',
        width: '80%',
        margin: '0 auto',
    }

    const liStyle = {
        color: 'pink',
        fontWeight: 500,
        fontSize: 12
    }

    return(
        <ul className='email-composition-errors' style={ulStyle}>
            {
                errors.map(
                    (error, i)=> <li key={`email-composition-error-${i}`} style={liStyle}>{error}</li>
                )
            }
        </ul>
    )
}