import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo, useCallback} from 'react';
import {ArticleDetails, ArticleList} from '@/entities/Article';
import {useParams} from 'react-router-dom';
import {DynamicModuleLoader, ReducersList} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useDispatch, useSelector} from 'react-redux';
import {Page} from '@/widgets/Page/Page';
import {VStack} from '@/shared/ui/Stack';
import cls from './ArticleDetailsPage.module.scss';
import {articleDetailsPageReducer} from '../../model/slices';
import {ArticleDetailsPageHeader} from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import {ArticleRecommendationList} from "@/features/articleRecommendationList";
import {ArticleDetailsComments} from "../ArticleDetailsComments/ArticleDetailsComments";
import {ArticleRating} from "@/features/articleRating";
import {getFeatureFlag} from "@/shared/lib/features";
import {Counter} from "@/entities/Counter";

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const {className} = props;
    const {t} = useTranslation('article-details');
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');
    const isCounterEnabled = getFeatureFlag('isCounterEnabled');

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader/>
                    <ArticleDetails id={id}/>
                    {isArticleRatingEnabled && <ArticleRating articleId={id}/>}
                    {isCounterEnabled && <Counter/>}
                    <ArticleRecommendationList/>
                    <ArticleDetailsComments id={id}/>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
