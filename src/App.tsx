
import { MouseEvent, useState } from 'react';
import Button from './components/Button/Button';
import Label from './components/Label/Label.tsx';
import Input from './components/Input/Input.tsx';



function App() {
	const [counter, setCounter ] = useState<number>(0);

	function addCounter(e:MouseEvent) {
		setCounter(counter + 1);
		console.log(counter);
		console.log(e);
      
      
	}

	return (
		<>
			<div className='wrapper'>
				<img src="../public/Group (1).svg" alt="logo" />
				<div className='separator'></div>
				<div>
					<h1>Sing in</h1>
					<form action="/">
						<div>
							<Label htmlFor="email">Email:</Label>
							<Input type={'email'} id={'email'} name={'email'} />
						</div>
						<div>
							<Label htmlFor="password">Password:</Label>
							<Input type={'password'} id={'password'} name={'password'} />
						</div>
						<Button appearence='small' onClick={addCounter}>sign In</Button>
					</form>
				</div>
			</div>
		</>
	);
}

export default App;
