import { useEffect, useState } from 'react';
import { PREFIX } from '../../../helpers/API';
import { Product } from '../../../interfaces/product.interface';
import Searchbar from '../../Searchbar/Searchbar';
import Title from '../../Title/Title';
import styles from  './Menu.module.css';
import axios from 'axios';
import MenuList from './MenuList/MenuList';


function Menu(){
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const getMenu = async (itemName: string) => {
		try {
			setLoading(true);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products${itemName ? `/?name=${itemName}` : ''}`);
			setProducts(data);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching menu:', error);
			setError(true);
			setLoading(false);
			return;
		}
	};

	useEffect(() => {
		getMenu('');
	}, []);

	const getNameOfItem = (name: string) => {
		getMenu(name);
	};


	

	return (
		<>
			<div className={styles['page-top']}>
				<Title>Menu</Title>
				<Searchbar onSubmit={getNameOfItem}></Searchbar>
			</div>

			<div>
				{!loading && !error && <MenuList products={products}/>}
				{loading && !error && <div className={styles['preloader']}></div>}
				{error && <div className={styles['error']}>Not found</div>}
			</div>
		</>
	);
}
 
export default Menu;