import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Output = (props) => {
    const { textValue, feedbackModalHandler } = props
    const [setValue] = useState(textValue);

    const copyHandler = () => {
        if (!textValue.length) {
            feedbackModalHandler('error', 'Nothing to copy!')
        } else {
            feedbackModalHandler('success', 'Copied to clipboard!')
        }
    }
    

    return (
        <div className="flex items-center gap-x-2 mb-10">
            <input
                className="px-3 py-2 rounded-lg shadow-lg outline-none"
                type="text"
                readOnly
                value={textValue}
                onChange={(e) => {
                    setValue(e.target.value)
                }}
            />

            <CopyToClipboard
                options={{ debug: props.debug, message: "" }}
                text={textValue}
            >
                <img
                    src="images/copy.svg"
                    alt="Copy Text to Clipboard"
                    className="w-8 cursor-pointer"
                    onClick={() => copyHandler()}
                />
            </CopyToClipboard>
        </div>
    )
}

export default Output
