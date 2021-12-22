const FeedbackToast = (props) => {
    const {fadeClass, type, text} = props
    return (
        <div className={`${fadeClass} w-screen fixed top-0 left-0 pt-0 flex items-center justify-center opacity-0 transition-all duration-500 ease-in-out`}>
            <p className={`py-2 px-3 rounded-xl ${type === 'error' ? 'bg-red-400' : 'bg-green-400'} font-mono text-white text-sm`}>{text}</p>
        </div>
    )
}

export default FeedbackToast
