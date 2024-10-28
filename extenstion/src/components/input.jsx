import PropTypes from "prop-types"

const InputElement = (props) => {
    return (
        <article className="input-field flex flex-col">
            <label {...props.labelProps} htmlFor={props.inputProps.id} className="text-xs">{props.labelText}</label>
            <input {...props.inputProps} className="input-box border-2 border-blue bg-transparent p-2 rounded-lg outline-none"/>
        </article>
    )
}

InputElement.propTypes = {
    labelProps: PropTypes.object,
    inputProps: PropTypes.object.isRequired,
    labelText: PropTypes.string
}

export default InputElement

InputElement.PropTypes = {
    labelProps:PropTypes.object,
    
}