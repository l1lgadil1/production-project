import {classNames} from "shared/lib/classNames/classNames";
import cls from './Input.module.scss'
import {InputHTMLAttributes, memo, useEffect, useRef, useState} from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    className?: string;
    type: string;
    value?: string;
    autofocus?:boolean;
    onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        autofocus,
        type = 'text',
        ...otherProps
    } = props;

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [caretPosition,setCaretPosition] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null)

    const onFocus = () => setIsFocused(true)
    const onBlur = () => setIsFocused(false)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length -1)
    }
    const onSelect = (e:any) =>{
        setCaretPosition(e?.target?.selectionStart || 0)
    }

    useEffect(()=>{
        if(autofocus){
            setIsFocused(true);
            inputRef?.current?.click()
        }
    },[autofocus])


    return (
        <div className={classNames(cls.InputWrapper, {}, [className])}>
            {placeholder && <div className={cls.placeholder}>
                {`${placeholder}>`}
            </div>}
            <div></div>
            <div className={cls.caretWrapper}>
                <input
                    ref={inputRef}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    type={type}
                    value={value}
                    className={cls.Input}
                    onChange={onChangeHandler}
                    onSelect={onSelect}
                    {...otherProps}
                />
                {isFocused && <span
                    className={cls.caret}
                    style={{
                        left:`${caretPosition * 9}px`
                    }}
                ></span>}
            </div>
        </div>
    );
});

