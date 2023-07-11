import cls from './ArticlesPageFilter.module.scss'
import {useCallback, useMemo} from "react";
import {ArticleSortSelector, ArticleView, ArticleViewSelector} from "entities/Article";
import {articlesPageActions} from "pages/ArticlesPage/model/slices/articlesPageSlice";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {
    getArticlesPageOrder, getArticlesPageSearch,
    getArticlesPageSort, getArticlesPageType,
    getArticlesPageView
} from "pages/ArticlesPage/model/selectors/articlesPageSelectors";
import {useTranslation} from "react-i18next";
import {Input} from "shared/ui/Input";
import {Card} from "shared/ui/Card/Card";
import {SortOrder} from "shared/types";
import {ArticleSortField, ArticleType} from "entities/Article/model/types/article";
import {fetchArticlesList} from "pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList";
import {useDebounce} from "shared/lib/hooks/useDebounce/useDebounce";
import {ArticleTypeTabs} from "entities/Article/ui/ArticleTypeTabs/ArticleTypeTabs";

interface ArticlesPageFilterProps {
    className?: string;
}

export const ArticlesPageFilter = ({className}: ArticlesPageFilterProps) => {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const {t} = useTranslation();
    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({replace: true}))
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500)


    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
        fetchData()
    }, [dispatch]);

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    }, [dispatch]);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1))
        fetchData()
    }, [dispatch]);

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageActions.setSearch(search));
        dispatch(articlesPageActions.setPage(1))
        debouncedFetchData()
    }, [dispatch, debouncedFetchData]);

    const onChangeType = useCallback((value:ArticleType) => {
        dispatch(articlesPageActions.setType(value));
        dispatch(articlesPageActions.setPage(1));
        fetchData()
    }, [dispatch]);


    return (
        <div className={''}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView}/>
            </div>
            <Card className={cls.search}>
                <Input
                    value={search}
                    onChange={onChangeSearch}
                    placeholder={t('Поиск')}
                />
            </Card>
            <ArticleTypeTabs
                onChangeType={onChangeType}
                value={type}
                className={cls.tabs}
            />
        </div>
    );
};

