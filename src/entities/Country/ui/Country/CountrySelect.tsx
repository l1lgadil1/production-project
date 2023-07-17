import {classNames} from "@/shared/lib/classNames/classNames";
import {Select} from "@/shared/ui/Select/Select";
import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {Country} from "@/entities/Country";

interface CountrySelect {
    className?: string;
    value?: Country
    onChange?: (val: Country) => void;
    readonly ?:boolean;
}

const options = [
    {value: Country.Armenia, content: Country.Armenia},
    {value: Country.Belarus, content: Country.Belarus},
    {value: Country.Kazakhstan, content: Country.Kazakhstan},
    {value: Country.Ukraine, content: Country.Ukraine},
]
export const CountrySelect = memo((props: CountrySelect) => {
    const {className, value, onChange,readonly} = props;
    const {t} = useTranslation()
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [])

    return <Select
        className={classNames('',{},[className])}
        readonly={readonly}
        label={t('Укажите страну')}
        options={options}
        value={value}
        onChange={onChangeHandler}
    />
});

