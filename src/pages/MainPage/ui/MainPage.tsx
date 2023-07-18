import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input/Input';
import {StarRating} from "@/shared/ui/StarRating/StarRating";
import {RatingCard} from "@/entities/Rating/ui/RatingCard/RatingCard";

const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <div>
            {t('Главная страница')}
            <RatingCard title={'Ваш фидбек'} feedbackTitle={'Оставьте отзыв'} hasFeedback={true} />
            {/*<StarRating size={50} />*/}
        </div>
    );
};

export default MainPage;
