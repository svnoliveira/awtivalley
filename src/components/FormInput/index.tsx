import { FieldError, UseFormRegisterReturn } from "react-hook-form"

interface IFormInputProps {
    children: React.ReactNode
    type: string
    error: FieldError | undefined
    register: UseFormRegisterReturn<string>
}

export const FormInput = ({children, type, register, error}: IFormInputProps) => {
    return (
        <div>
            <label htmlFor={register.name}>{register.name}</label>
            <input
            placeholder={String(children)} type={type} {...register}></input>
            {error && <p>{error.message}</p>}
        </div>
    )
}