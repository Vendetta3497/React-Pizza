import { CartItemProps } from './CartItem.props';
import styles from  './CartItem.module.css';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { basketActions } from '../../store/basket.slice';

function CartItem({ ...props}: CartItemProps){
	const dispatch = useDispatch<AppDispatch>();

	function increase() {
		dispatch(basketActions.add(props.id)); 
	}

	function decrease() {
		dispatch(basketActions.remove(props.id));
	}

	function deleteItem() {
		dispatch(basketActions.deleteItem(props.id));
	}

	return (
		<div className={styles['item']}>

			<div className={styles['left-side']}>
				<img className={styles['item-img']} src={props.image} alt="pizza" />
				<div className={styles['description']}>
					<div className={styles['item-name']}>{props.name}</div>
					<div className={styles['price']}>
						<div className={styles['price-item']}>{props.price}</div>
						<div className={styles['price-item']}>&#x20BD;</div>
					</div>
				</div>
			</div>
			<div className={styles['right-side']}>
				<Button  className={styles['btn-decrease']} onClick={decrease}><img src='../../../public/minus.svg'/></Button>
				<div className={styles['count-of-items']}>{props.count}</div>
			      <Button className={styles['btn-increase']} onClick={increase}><img src='../../../public/plus.svg'/></Button>
				<Button className={styles['btn-deleteItem']} onClick={deleteItem}><img src='../../../public/cross.svg'/></Button>

			</div>
			
		</div>
	);
}
 
export default CartItem;