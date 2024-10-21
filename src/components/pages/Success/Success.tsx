import { useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import styles from './Succes.module.css';


function Success(){
	const navigate = useNavigate();

	return (
		<div className={styles['succes']}>
			<img className={styles['img']} src="/big-pizza.png" alt="picture of pizza" />
			<div className={styles['info']}>Your order has been successfully completed!</div>
			<Button appearence='big' onClick={() => navigate('/')}>Menu</Button>
		</div>
	);
}

export default (Success);