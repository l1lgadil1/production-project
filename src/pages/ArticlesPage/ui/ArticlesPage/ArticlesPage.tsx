import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo, useCallback} from 'react';
import {ArticleList} from 'entities/Article';
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useInitialEffect} from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import {useSelector} from 'react-redux';
import {useAppDispatch} from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {Page} from 'widgets/Page/Page';
import {useSearchParams} from 'react-router-dom';
import {ArticlesPageFilters} from '../ArticlesPageFilters/ArticlesPageFilters';
import {fetchNextArticlesPage} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {initArticlesPage} from '../../model/services/initArticlesPage/initArticlesPage';
import {articlesPageReducer, getArticles} from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import {ArticleInfiniteList} from "pages/ArticlesPage/ui/ArticleInfiniteList/ArticleInfiniteList";

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const {className} = props;
    const {t} = useTranslation();
    const dispatch = useAppDispatch();


    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilters/>
                <ArticleInfiniteList/>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
