import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { ReactComponent as CrownLogo } from "../../assets/crown.svg"
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component"
import { CartIcon } from "../../components/cart-icon/cart-icon.component"
import { CartContext } from "../../contexts/cart.context"
import { UserContext } from "../../contexts/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import {LogoContainer, NavLink, NavLinks, NavigationContainer} from './navigation.styles.jsx'

export const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return(
        <>
            <NavigationContainer>
                
                <LogoContainer to="/">
                    <CrownLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}> SIGN OUT</NavLink>
                            ) 
                            :(
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                            )
                    }
                    <CartIcon/>
                </NavLinks>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </>
    )
  }