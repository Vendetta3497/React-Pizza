import styles from  './Title.module.css';
import { TitleProps } from './Title.props';
import cn from 'classnames';

function Title({children, className, ...props}: TitleProps){
	return (
		<h1 {...props} className={cn(styles['title'], className)} >{children}</h1>
	);
}
 
export default Title;