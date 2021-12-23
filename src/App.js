import { useState } from 'react'
import Output from './components/outputs/Output'
import Slider from './components/inputs/Slider'
import Checkbox from './components/inputs/Checkbox'
import SimpleButton from './components/inputs/SimpleButton'
import FeedbackToast from './components/outputs/FeedbackToast'

function App() {
	const [modalSettings, setModalSettings] = useState({ showModal: false, fadeClass: '', type: '', text: '' })
	const [textValue, setTextValue] = useState('')
	const [sliderValue, setSliderValue] = useState(8)
	const [checkboxData, setCheckboxData] = useState([
		{ id: 'number', primaryText: 'Include Numbers', secondaryText: '(1234)', isChecked: false },
		{ id: 'symbol', primaryText: 'Include Symbols', secondaryText: '(@#$%)', isChecked: false },
		{ id: 'lowercase', primaryText: 'Include Lowerase Characters', secondaryText: '(abcd)', isChecked: false },
		{ id: 'uppercase', primaryText: 'Include Uppercase Characters', secondaryText: '(ABCD)', isChecked: false }
		// { id: 5, primaryText: 'Exclude Similar Characters', secondaryText: '(i, I, l, 1, L, o, 0, O)', isChecked: false }
	])
	const uppercaseObj = checkboxData.find((obj) => obj.id === 'uppercase')
	const lowercaseObj = checkboxData.find((obj) => obj.id === 'lowercase')
	const numberObj = checkboxData.find((obj) => obj.id === 'number')
	const symbolObj = checkboxData.find((obj) => obj.id === 'symbol')

	const sliderMoved = (newVal) => {
		setSliderValue(newVal)
	}

	const checkHandler = (clicked) => {
		setCheckboxData(
			checkboxData.map((checkbox) =>
				checkbox.id === clicked.id ? { ...checkbox, isChecked: !checkbox.isChecked } : checkbox
			)
		)
	}

	// All the functions that are responsible to return a random value that we will use to create password.
	const getRandomNumber = () => {
		return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48)
	}
	const getRandomSymbol = () => {
		const symbols = '~!@#$%^&*()_+{}":?><;.,';
		return symbols[Math.floor(Math.random() * symbols.length)]
	}
	const getRandomLower = () => {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
	}
	const getRandomUpper = () => {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
	}
	// Random more secure value
	const secureMathRandom = () => {
		return window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1)
	}

	// Object of all the function names that we will use to create random letters of password
	const randomFunc = {
		lower: getRandomLower,
		upper: getRandomUpper,
		number: getRandomNumber,
		symbol: getRandomSymbol,
	};

	const getObjectsToGeneratePassword = () => {
		const length = +sliderValue
		const hasLower = lowercaseObj.isChecked
		const hasUpper = uppercaseObj.isChecked
		const hasNumber = numberObj.isChecked
		const hasSymbol = symbolObj.isChecked
		setTextValue(generateNewPassword(length, hasLower, hasUpper, hasNumber, hasSymbol))
	}

	const generateNewPassword = (length, lower, upper, number, symbol) => {
		let generatedPassword = ""
		const typesCount = lower + upper + number + symbol
		const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])
		if (typesCount === 0) {
			feedbackModalHandler('error', 'No parameters chosen!')
		}
		for (let i = 0; i < length; i++) {
			typesArr.forEach(type => {
				const funcName = Object.keys(type)[0];
				generatedPassword += randomFunc[funcName]()
			});
		}
		return generatedPassword.slice(0, length)
			.split('').sort(() => Math.random() - 0.5)
			.join('')
	}

	const feedbackModalHandler = (type, text) => {
		setModalSettings({ showModal: true, fadeClass: 'fadeHide', type: type, text: text })
		setTimeout(() => {
			setModalSettings({ showModal: true, fadeClass: 'fadeShow', type: type, text: text })
		}, 0)
		setTimeout(() => {
			setModalSettings({ showModal: true, fadeClass: 'fadeHide', type: type, text: text })
			setTimeout(() => {
				setModalSettings({ showModal: false, fadeClass: '', type: '', text: '' })
			}, 500)
		}, 2500)
	}

	return (
		<div className="App w-full h-screen flex flex-col items-center justify-start px-5 py-10 bg-red-100">
			<h1 className=" py-5 text-2xl font-bold font-mono text-center">Password Generator</h1>

			<Output textValue={textValue} feedbackModalHandler={feedbackModalHandler} />

			<div className="flex flex-col items-start gap-y-2">
				<Slider sliderValue={sliderValue} sliderMoved={sliderMoved} />

				{checkboxData.map((checkboxItem) => (
					<Checkbox key={checkboxItem.id} checkboxItem={checkboxItem} checkHandler={checkHandler} />
				))}
			</div>

			<SimpleButton generateNewPassword={getObjectsToGeneratePassword} />

			{modalSettings.showModal && <FeedbackToast fadeClass={modalSettings.fadeClass} type={modalSettings.type} text={modalSettings.text} />}

			<p className="w-2/3 absolute bottom-2 text-center font-mono text-xs text-gray-600">Password Generator App made with <br/> Create-React-App and TailwindCSS</p>
		</div>
	)
}

export default App
