import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FeedbackToast from "./FeedbackToast"

const Output = (props) => {
    const { textValue } = props
    const [setValue] = useState(textValue);
    const [copied, setCopied] = useState(false)
    const [fadeClass, setFadeClass] = useState('fadeHide')

    const copyHandler = () => {
        if (!textValue.length) return
        setCopied(true)
        setTimeout(() => {
            setFadeClass('fadeShow')
        }, 0);
        setTimeout(() => {
            setFadeClass('fadeHide')
            setTimeout(() => {
                setCopied(false)
            }, 500);
        }, 2500);
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
                    setCopied(false)
                }}
            />

            <CopyToClipboard
                options={{ debug: props.debug, message: "" }}
                onCopy={() => setCopied(true)}
                text={textValue}
            >
                <img
                    src="images/copy.svg"
                    alt="Copy Text to Clipboard"
                    className="w-8 cursor-pointer"
                    onClick={() => copyHandler()}
                />
            </CopyToClipboard>

            {copied && <FeedbackToast fadeClass={fadeClass} type="success" text="Copied to clipboard!" />}
        </div>
    )
}

export default Output
