import cls from './ArticleInfiniteList.module.scss'
import {ArticleList} from "entities/Article";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {Text} from "shared/ui/Text/Text";
import {getArticles} from "pages/ArticlesPage/model/slices/articlesPageSlice";
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView
} from "pages/ArticlesPage/model/selectors/articlesPageSelectors";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {initArticlesPage} from "pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage";
import {useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface ArticleInfiniteListProps {
    className?: string;
}

export const ArticleInfiniteList = ({className}: ArticleInfiniteListProps) => {
    const {t} =useTranslation();
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);
    const [searchParams] = useSearchParams();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    if(error){
        return <Text text={t('Произошла непредвиденная ошибка')} />
    }

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
            className={cls.list}
        />
    );
};

