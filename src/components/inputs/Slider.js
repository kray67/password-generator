const Slider = (props) => {
    const {sliderValue, sliderMoved} = props

    return (
        <div className="w-full flex items-center justify-between gap-x-3 pb-5">
            <input
                type="range"
                min="4"
                max="16"
                value={sliderValue}
                className="range-slider cursor-pointer flex-grow"
                onChange={(ev) => sliderMoved(ev.target.value)}
            />
            <p className="text-xs font-mono text-gray-600">{`${sliderValue} ${sliderValue === 1 ? 'character' : 'characters'}`}</p>
        </div>
    )
}

export default Slider
