import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import Label from '../../Label/Label';
import Title from '../../Title/Title';
import styles from '../Register/Register.module.css';
import { FormEvent, useEffect } from 'react';
import { register, userActions } from '../../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';

export type RegisterForm = {
	email: {
		value: string
	},
	password: {
		value: string
	},
	name: {
		value: string
	}
}



function Register(){

	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const {jwt, RegisterStatusError} = useSelector((s: RootState) => s.user);
	console.log(jwt);
	

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submitRegister = (event: FormEvent) =>{
		event.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = event.target as typeof event.target & RegisterForm;
		const{ email, password, name} = target;
		console.log(email.value, password.value, name.value);
		
		sendRegister(email.value, password.value, name.value);
	};

	const sendRegister = (email:string, password:string,  name:string) => {
		dispatch(register({email, password, name}));
	};


	return (
		<>
			<div className={styles['content-wrapper']}>
				<Title className={styles['title']}>Sing up</Title>
				
				{RegisterStatusError !== null &&  <div className={styles['error']}>{RegisterStatusError}</div>}

				<form action="/" className={styles['form']} onSubmit={submitRegister}>
					<div className={styles['input-wrapper']}>
						<Label htmlFor="email">Your email:</Label>
 			<Input type={'email'} id={'email'} name={'email'} placeholder='Email'/>
	 		</div>
	 		<div className={styles['input-wrapper']}>
	 			<Label htmlFor="password">Your password:</Label>
	 			<Input type={'password'} id={'password'} name={'password'} placeholder='Password'/>
	 		</div>
			 <div className={styles['input-wrapper']}>
	 			<Label htmlFor="name">Your name:</Label>
	 			<Input type={'name'} id={'name'} name={'name'} placeholder='Password'/>
	 		</div>
	 		<Button appearence='big'>Sign in</Button>
	 	</form>

		 <div className={styles['register-wrapper']}>
					<div className={styles['text']}>Do you have an account?</div>
					<Link to={'/auth/login'}><span className={styles['reg-link']}>Sing in</span></Link>
 		</div>
			</div>
		</>
	);
}
 
export default Register;


