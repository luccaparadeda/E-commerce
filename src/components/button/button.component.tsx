import './button.styles.scss'

const BUTTON_TYPE_CLASSES:any= {
    google: 'google-sign-in',
    inverted: 'inverted'
}

export const Button = ({children, buttonType, ...otherProps}:any) => {
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
        {...otherProps}
        >{children}
        </button>
    )
}