import './coffee-item.css';
import { Link } from 'react-router-dom';
// import CoffeeItemPage from '../coffeeItemPage/CoffeeItemPage';

const CoffeeItem = (props) => {
    const { img, name, price, type, id } = props;

    return (
        <Link to={`/coffeeitem${id}`} className='coffee-item'  >
            <img src={img} alt='coffee-logo' />
            <span className='item-name'>{name}</span>
            <span className='item-info'>{type}</span>
            <span className='item-info'>{price}$</span>
        </Link >

    )
}
export default CoffeeItem;