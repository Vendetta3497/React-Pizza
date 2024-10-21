import { useLoaderData, useNavigate } from 'react-router-dom';
import { Product } from '../../../interfaces/product.interface';
import Button from '../../Button/Button';
import styles from './Product.module.css';
import { basketActions } from '../../../store/basket.slice';
import { AppDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';

function ProductPage(){

	const dispatch = useDispatch<AppDispatch>();
	const data = useLoaderData() as Product;
	const navigate = useNavigate();
	console.log(data);
	

	const goBack = () => {
		navigate('/');
	};
	
	const add = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(basketActions.add(data.id));
	};

	return (
		<div className={styles['product']}>
			<div className={styles['product-top']}>
				<div className={styles['title']}>
					<button onClick={goBack} className={styles['btn-back']}><img src="/button-back.svg" alt="btn-icon-back" /></button>
					<h2>{data.name}</h2>
				</div>
				<Button onClick={add} appearence='small'>add at cart</Button>
			</div>
			<div className={styles['product-info']}>
				<img src={data.image} alt="" />
				<div className={styles['right-side']}>
					<div className={styles['price']}>
						<div>Price</div>
						<div className={styles['sum']}>{data.price}</div>
						<div className={styles['currency']}>&#x20BD;</div>
					</div>
					<div className={styles['raiting']}>
						<div>Rating</div>
						<div className={styles['raiting-score']}>{data.rating}</div>
						<div className={styles['raiting-img']}><img src="/raiting.svg" alt="star icon" /></div>
					</div>
					<ul>
						Product composition:
						{data.ingredients.map(el => (
							<li key={el}>{el}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
 
export default ProductPage;