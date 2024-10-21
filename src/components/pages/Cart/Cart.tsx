import { useDispatch, useSelector } from 'react-redux';
import Title from '../../Title/Title';
import { AppDispatch, RootState } from '../../../store/store';
import CartItem from '../../CartItem/CartItem';
import {  useEffect, useState } from 'react';
import { Product } from '../../../interfaces/product.interface';
import axios from 'axios';
import { PREFIX } from '../../../helpers/API';
import styles from  './Cart.module.css';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import { basketActions } from '../../../store/basket.slice';



function Basket(){
	const items = useSelector((s: RootState) => s.basket.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);

	const [cartProducts, setCartProducts] = useState<Product[]>([]);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();



	const [showMessage, setShowMessage] = useState<boolean>(false);
	 
		
	

	const cardProductsSum: number = items.map(i => {
		const product = cartProducts.find(p => p.id === i.id);
		if (!product) {
			return 0;
		}
		return product.price * i.count;
	}).reduce((acc, el) => acc += el, 0);

	const sumOfDelivery: number = Math.ceil(cardProductsSum / 7);

	const noItems: JSX.Element = (<div className={styles['no-items']}>You didn't order anything</div>);

	const countOfAllItems: number = items.map(el => el.count).reduce((acc, el) => acc += el, 0);


	async function getItem (id:number) {
		const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
		return data;
	}

	async function loadAllItems() {
		const res  = await Promise.all(items.map((i => getItem(i.id))));
		if (res.length === 0) {
			setShowMessage(true);
		}
		setCartProducts(res);
	}

	useEffect(() => {
		loadAllItems();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items])	;

	const checkout = async () => {
		  await axios.post(`${PREFIX}/order`, {
			products: items
		},
		{
			headers: {
				Authorization: `Bearer ${jwt}`
			}

		});
		if (items.length > 0) {
			dispatch(basketActions.cleanItemsAfterOrder());
			navigate('/success');
		}
	};


	return (
		<>
			<Title>Cart</Title>
			
			{ items.map(i => {
				const product = cartProducts.find(p => p.id === i.id);
				if (!product) {
					return;	
				}
				return <CartItem key={product.id} count={i.count} {...product}/>;
			})}
			{showMessage && items.length === 0 && noItems}

			<div className={styles['items']}>
				<div className={styles['item']}>
					<div className={styles['info']}>Summary</div>
					<span className={styles['currency']}>{cardProductsSum} &#x20BD;</span>
				</div>
				<hr />

				<div className={styles['item']}>
					<div className={styles['info']}>Delivery</div>
					<span className={styles['currency']}>{sumOfDelivery} &#x20BD;</span>
				</div>
				<hr />

				<div className={styles['item']}>
					<div className={styles['info']}>Summary With Delivery <span className={styles['info-count']}>{countOfAllItems}</span> </div>
					<span className={styles['currency']}>{cardProductsSum + sumOfDelivery} &#x20BD;</span>
				</div>
				<hr />
			</div>
			<div className={styles['checkout']}>
				<Button appearence='big' onClick={checkout}>Order !</Button>
			</div>
			
		</>
	);
};

 
export default Basket;