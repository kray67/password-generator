const Checkbox = (props) => {
    const { checkboxItem, checkHandler} = props

    const checkIfLocked = () => {
        if(checkboxItem.locked) {
            return
        } else {
            checkHandler(checkboxItem)
        }
    }

    return (
        <div onClick={() => checkIfLocked(checkboxItem)} className={`flex items-center justify-center gap-x-2 flex-nowrap`}>
            <img
                className="w-5"
                src={checkboxItem.isChecked ? "images/checkbox-checked.svg" : "images/checkbox-unchecked.svg"} alt="Checkbox"
            />
            
            <p className="font-mono">{checkboxItem.primaryText}</p>
            <p className="hidden md:flex">{checkboxItem.secondaryText}</p>
        </div>
    )
}

export default Checkbox
