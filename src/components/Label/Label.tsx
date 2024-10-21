import styles from  './Label.module.css';
import { LabelProps } from './Label.props.tsx';
import cn from 'classnames';

function Label({ children, className, htmlFor, ...props }: LabelProps ){
	return (
		<label {...props} htmlFor={htmlFor} className={cn(styles['label'], className)}>{children}</label>
	);
}
 
export default Label;