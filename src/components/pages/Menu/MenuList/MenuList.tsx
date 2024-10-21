import { MenuListProps } from './MenuList.props';
import Card from '../../../Card/Card';
import styles from '../MenuList/MenuList.module.css';

function MenuList({products}: MenuListProps){
	return (
		<div className={styles['wrapper']}>
			{ products.map((p) => (
				<Card 
					key={p.id}
					  id={p.id}
					  name={p.name}
					  ingredients={p.ingredients.join(', ')}
					  price={p.price}
					  image={p.image}
					  raiting={p.rating}
					  />

			))}
		</div>
	);
}
 
export default MenuList;