import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../store/cart/cart.action'
import { selectCartItems } from '../../store/cart/cart.selector'
import { Button, BUTTON_TYPE_CLASSES } from '../button/button.component'
import {Footer, Name, Price, ProductCartContainer} from './product-card.styles.jsx'

export const ProductCard = ({product}) => {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const {imageUrl, name, price} = product
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))
    
    return(
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to card</Button>
        </ProductCartContainer>
    )
}