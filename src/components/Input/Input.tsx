import { forwardRef } from 'react';
import styles from  './Input.module.css';
import { InputProps } from './Input.props.tsx';
import cn from 'classnames';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid = true, className, type, id, name, ...props}, ref){
	return (
		<input 
			ref={ref} 
			className={cn(styles['input'], className, { [styles['invalid']]: isValid })} 
			type={type} 
			id={id} 
			name={name} {...props}/>
	);
});
 
export default Input;