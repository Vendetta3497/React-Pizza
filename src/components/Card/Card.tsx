import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import styles from  './Card.module.css';
import { CardProps } from './Card.props';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { basketActions } from '../../store/basket.slice';

function Card(props: CardProps){

	const dispatch = useDispatch<AppDispatch>();
	
	const add = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(basketActions.add(props.id));
	};

	return (
		<Link to={`/product/${props.id}`} className={styles['card-link']}>
			<div className={styles['card']}>
				<div className={styles['card-top']}>
					<img className={styles['card-img']} src={props.image} alt="pizza" />
					<div className={styles['price']}>
						<div>{props.price}</div>
						<div className={styles['currency']}>&#x20BD;</div>
					</div>
					<div className={styles['raiting']}>
						<div className={styles['raiting-score']}>{props.raiting}</div>
						<div className={styles['raiting-img']}><img src="/raiting.svg" alt="star icon" /></div>
					</div>
					<Button className={styles['card-btn']} onClick={add}><img src="/basket-white.svg" alt="basket button"/></Button>
				</div>
				<div className={styles['card-info']}>
					<div className={styles['title']}>
						{props.name}
					</div>
					<div className={styles['description']}>
						{props.ingredients}
					</div>
				</div>
			</div>
		</Link>
	);
}
 
export default Card;