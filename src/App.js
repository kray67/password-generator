import { useState } from 'react'
import Output from './components/outputs/Output'

function App() {
	const [textValue, setTextValue] = useState('Hello')

	const onChangeText = (str) => {
		setTextValue(`${textValue} and ${str}`)
	}

	return (
		<div className="App w-full h-screen flex flex-col items-center justify-start px-5 py-10 bg-blue-200">
			<h1 className=" py-5 text-2xl font-bold font-mono text-center">Password Generator</h1>
			<Output textValue={textValue} />

			<button onClick={() => onChangeText('Goodbye') }>Change Text</button>
		</div>
	)
}

export default App
