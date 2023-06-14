import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './Select.module.scss'
import {ChangeEvent, memo, useMemo} from "react";

interface SelectOption {
    value: string
    content: string
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[]
    value?: string;
    onChange?: (val: string) => void;
    readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        options,
        value,
        onChange,
        readonly
    } = props;

    const optionList = useMemo(() => options?.map((opt) => (
        <option
            key={opt.value}
            className={cls.option}
            value={opt.value}
        >
            {opt.content}
        </option>
    )), [])

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    }

    const mods: Mods = {}
    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label
                && <span className={cls.label}>{label + '>'}</span>
            }
            <select
                disabled={readonly}
                value={value}
                onChange={onChangeHandler}
                className={cls.select}
                name="" id="">
                {optionList}
            </select>
        </div>
    );
});

