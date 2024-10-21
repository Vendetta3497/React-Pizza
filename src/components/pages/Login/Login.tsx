import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import Label from '../../Label/Label';
import Title from '../../Title/Title';
import styles from '../Login/Login.module.css';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { login, userActions } from '../../../store/user.slice';

export type LoginForm = {
	email: {
		value: string
	},
	password: {
		value: string
	}
}


function Login(){
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, statusError} = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);


	
	 const submit = (event: FormEvent) =>{
		event.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = event.target as typeof event.target & LoginForm;
		const{ email, password} = target;
		sendLogin(email.value, password.value);
	};

	const sendLogin = (email:string, password:string) => {
		dispatch(login({email, password}));
	};

	return (
	   <div className={styles['content-wrapper']}>
			<Title className={styles['title']}>Sing in</Title>

			{statusError !== null &&  <div className={styles['error']}>{statusError}</div>}

			<form action="/" className={styles['form']} onSubmit={submit}>
				<div className={styles['input-wrapper']}>
					<Label htmlFor="email">Your email:</Label>
					<Input type={'email'} id={'email'} name={'email'} placeholder='Email'/>
				</div>
				<div className={styles['input-wrapper']}>
					<Label htmlFor="password">Your password:</Label>
					<Input type={'password'} id={'password'} name={'password'} placeholder='Password'/>
				</div>
				<Button appearence='big'>Sign in</Button>
			</form>
			<div className={styles['register-wrapper']}>
				<div className={styles['text']}>Don't have an account?</div>
				<Link to={'/auth/register'}><span className={styles['reg-link']}>Sing up</span></Link>
			</div>
		</div>
	);
}
 
export default Login;