type inputFieldProps = {
    label: string,
    placeholder: string,
    type: string,
    onChange: Function,
    value?: string
}

export default function InputField(props: inputFieldProps) {
    return (
        <div className="w-full">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">{props.label}</label>
            <input type={props.type} id="email" className="bg-white bg-opacity-30 focus:bg-opacity-50 text-base rounded-lg border border-transparent focus:border focus:border-primary block w-full p-2.5 outline-none" placeholder={props.placeholder} onChange={(e) => props.onChange(e)} required value={props.value} />
        </div>
    );
}