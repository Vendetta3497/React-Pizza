import { Outlet } from 'react-router-dom';
import styles from '../Auth/AuthLAyout.module.css';


function AuthLayout(){
	return (
		<div className={styles['layout']}>
			<div className={styles['logo']}>
				<img src="../public/Group (1).svg" alt="logo" />
			</div>
			<div className={styles['content']}>
				<Outlet/>
			</div>
		</div>
	);
}
 
export default AuthLayout;