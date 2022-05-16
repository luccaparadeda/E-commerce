import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as CrownLogo } from "../../assets/crown.svg"
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component"
import { CartIcon } from "../../components/cart-icon/cart-icon.component"
import { CartContext } from "../../contexts/cart.context"
import { UserContext } from "../../contexts/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import './navigation.styles.scss'

export const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return(
        <>
            <div className="navigation">
                
                <Link to="/" className="logo-container">
                    <CrownLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link to='/shop' className="nav-link">
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}> SIGN OUT</span>
                            ) 
                            :(
                            <Link to='/auth' className="nav-link">
                                SIGN IN
                            </Link>
                            )
                    }
                    <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet/>
        </>
    )
  }