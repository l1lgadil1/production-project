import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer
} from 'entities/Profile';
import {useCallback, useEffect} from 'react';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {useSelector} from "react-redux";
import {ProfilePageHeader} from "./ProfilePageHeader/ProfilePageHeader";
import {Currency} from "entities/Currency";
import {Country} from "entities/Country";
import {Text} from "shared/ui/Text";
import {TextTheme} from "shared/ui/Text/ui/Text";
import {ValitdateProfileError} from "entities/Profile/model/types/profile";

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({className}: ProfilePageProps) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly)
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ValitdateProfileError.SERVER_ERROR]:t('Серверная ошибка при сохранении'),
        [ValitdateProfileError.INCORRECT_COUNTRY]:t('Некорректный регион'),
        [ValitdateProfileError.INCORRECT_AGE]:t('Некорректный возраст'),
        [ValitdateProfileError.INCORRECT_USER_DATA]:t('Некорректно указаны имя или фамилия'),
        [ValitdateProfileError.NO_DATA]:t('Данные не указаны'),
    }

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    const onChangeFirstname = useCallback(
        (val: string) => {
            console.log('--------------------')
            console.log(val)
            console.log('--------------------')
            dispatch(profileActions.updateProfile({first: val || ''}))
        }, [dispatch]);

    const onChangeLastname = useCallback(
        (val: string) => {
            dispatch(profileActions.updateProfile({lastname: val || ''}))
        }, [dispatch]);


    const onChangeAge = useCallback(
        (val: string) => {
            const pattern = /^\d+$/;
            const isValid = pattern.test(val)
            if (!isValid) return;
            dispatch(profileActions.updateProfile({age: Number(val || 0)}))
        }, [dispatch]);


    const onChangeCity = useCallback(
        (val: string) => {
            dispatch(profileActions.updateProfile({city: val}))
        }, [dispatch]);

    const onChangeUsername = useCallback((val: string) => {
        dispatch(profileActions.updateProfile({username: val || ''}))
    }, [dispatch])

    const onChangeAvatar = useCallback((val: string) => {
        dispatch(profileActions.updateProfile({avatar: val || ''}))
    }, []);

    const onChangeCurrency = useCallback((val: Currency) => {
            dispatch(profileActions.updateProfile({currency: val}))
        },
        [dispatch],
    );
    const onChangeCountry = useCallback((val: Country) => {
            dispatch(profileActions.updateProfile({country: val}))
        }, [dispatch]
    );


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfilePageHeader/>
                {validateErrors?.length && validateErrors.map((err) =>
                    (<Text key={err} theme={TextTheme.ERROR} text={validateErrorTranslates[err]}/>))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeAvatar={onChangeAvatar}
                    onChangeUsername={onChangeUsername}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />

            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
