// import { useState, useEffect } from 'react'
// import { CopyToClipboard } from 'react-copy-to-clipboard'
// import SuccessToast from "./SuccessToast"

// const [copied, setCopied] = useState(false)

const Output = (props) => {
    const { textValue } = props

    return (
        <div className="flex items-center justify-between">
            <input type="text" readOnly value={textValue} />

            {/* <CopyToClipboard>
                <button onClick={() => onRemove(cartItem)}></button>
            </CopyToClipboard>

            { copySuccess && <SuccessToast /> } */}
        </div>
    )
}

export default Output
