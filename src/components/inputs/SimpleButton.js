const SimpleButton = (props) => {
    const { generateNewPassword } = props

    return (
        <button className="py-3 px-5 mt-10 rounded-lg shadow-lg bg-slate-500 text-white font-mono hover:bg-slate-800 transition-colors duration-200 ease-in-out" onClick={() => generateNewPassword()}>New Password</button>
    )
}

export default SimpleButton
