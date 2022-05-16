import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { Button } from '../button/button.component'
import { CartItem } from '../cart-item/cart-item.component'
import './cart-dropdown.styles.scss'
import {Link} from 'react-router-dom'

export const CartDropdown = () => {
    const {cartItems} = useContext(CartContext)
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map( item => (
                <CartItem key={item.id} cartItem={item}/>))}
            </div>
            <Link to='/confirmation'>
                <Button>GO TO CHECKOUT</Button>
            </Link>
        </div>
    )
}