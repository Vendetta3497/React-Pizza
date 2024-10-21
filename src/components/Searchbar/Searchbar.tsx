import { FormEvent } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Searchbar.module.css';

type ItemForm = {
  name: {
    value: string | undefined;
  };
};

type SearchbarProps = {
  onSubmit: (name: string) => void;
};

function Searchbar({ onSubmit }: SearchbarProps) {
	const nameOfItem = (e: FormEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & ItemForm;
		const { name } = target;
		onSubmit(name.value || '');
	};

	return (
		<form action="/" className={styles['searchbar']} onSubmit={nameOfItem}>
			<Button className={styles['search-btn']}>
				<img
					className={styles['btn-img']}
					src="/search.svg"
					alt="search icon"
				/>
			</Button>
			<Input
				className={styles['search-input']}
				type={'name'}
				id={'name'}
				name={'name'}
				placeholder="Enter a dish or composition"
			/>
		</form>
	);
}

export default Searchbar;
