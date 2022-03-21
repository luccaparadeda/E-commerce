import { ButtonHTMLAttributes } from 'react'
import './button.styles.scss'

const BUTTON_TYPE_CLASSES:any= {
    google: 'google-sign-in',
    inverted: 'inverted'
}

export const Button = ({children, buttonType}:any) => {
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
        >{children}
        </button>
    )
}