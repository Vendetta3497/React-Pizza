import {  NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './MenuLayout.module.css';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

function Layout(){
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((s: RootState) => s.user.profile);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const items = useSelector((s: RootState) => s.basket.items);
	


	useEffect(() => {
		dispatch(getProfile(jwt));
	}, [dispatch, jwt]);
 
	const logOut = () => {
		dispatch(userActions.logOut());
		navigate('/auth/login');
	};

	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img className={styles['user__img']} src="./avatar.svg" alt="your picture" />
					<div className={styles['user__name']}>{profile?.name}</div>
					<div className={styles['user__email']}>{profile?.email}</div>
				</div>
				<nav className={styles['nav']}>
					<NavLink className={({ isActive }) =>
						`${styles['nav__item']} ${isActive ? styles['active'] : ''}`} 
					 to='/'><img src="/menu.svg" alt="menu icon" />Menu</NavLink>
					<NavLink className={({ isActive }) =>
						`${styles['nav__item']} ${isActive ? styles['active'] : ''}`}  to='/basket'><img src="/bascket.svg" alt="bascket icon" />
						Cart<span className={styles['counter']}>{items.reduce((acc, item) => acc += item.count, 0)}</span>
					</NavLink>
				</nav>
				<Button className={styles['nav_btn']} appearence={'small'} onClick={logOut}> 
					<img className={styles['nav_btn__img']} src="/log-out.svg" alt="" /> Go out
				</Button>
			</div>
			<div className={styles['main-side']}>
				<Outlet/>
			</div>
		</div>
	);
}
 
export default Layout;