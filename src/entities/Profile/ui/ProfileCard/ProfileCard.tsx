import {classNames, Mods} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {Text, TextAlign, TextTheme} from 'shared/ui/Text/ui/Text';
import cls from './ProfileCard.module.scss';
import {Profile} from "entities/Profile";
import {Loader} from "shared/ui/Loader/Loader";
import {Input} from "shared/ui/Input";
import {Avatar} from "shared/ui/Avatar/Avatar";
import {Select} from "shared/ui/Select/Select";
import {Currency} from "entities/Currency/model/types/currency";
import {CurrencySelect} from "entities/Currency";
import {Country} from "entities/Country/model/types/country";
import React from "react";
import {CountrySelect} from "entities/Country";

interface ProfileCardProps {
    className?: string;
    data?: Profile
    error?: string;
    isLoading?: boolean;
    onChangeFirstname?: (val: string) => void;
    onChangeLastname?: (val: string) => void;
    onChangeAge?: (val: string) => void;
    onChangeCity?: (val: string) => void;
    onChangeUsername?: (val: string) => void;
    onChangeAvatar?: (val: string) => void;
    onChangeCurrency?:(val:Currency)=>void;
    onChangeCountry?:(val:Country)=>void;
    readonly?: boolean;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
        readonly
    } = props
    const {t} = useTranslation('profile');

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {[cls.loading]: true}, [className])}>
                <Loader/>
            </div>
        )
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {[cls.loading]: true}, [className, cls.error])}>
                <Text
                    title={t('Произошла непредвиденная ошибка')}
                    text={t('Попробуйте обновить страницу')}
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                />
            </div>
        )
    }

    const mods: Mods = {
        [cls.editing]: !readonly
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.data}>
                {data?.avatar &&
                    <div className={cls.avatarWrapper}>
                        <Avatar src={data.avatar}/>
                    </div>
                }
                <Input
                    value={data?.first}
                    placeholder={t('Ваше имя')}
                    className={cls.input}
                    onChange={onChangeFirstname}
                    readonly={readonly}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Ваша фамилия')}
                    className={cls.input}
                    onChange={onChangeLastname}
                    readonly={readonly}
                />
                <Input
                    value={data?.age}
                    placeholder={t('Ваш возраст')}
                    className={cls.input}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    value={data?.city}
                    placeholder={t('Ваш город')}
                    className={cls.input}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    value={data?.username}
                    placeholder={t('Username')}
                    className={cls.input}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('Введите ссылку на аватар')}
                    className={cls.input}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};
