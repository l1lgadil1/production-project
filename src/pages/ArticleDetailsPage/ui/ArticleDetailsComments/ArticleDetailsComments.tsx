import cls from './ArticleDetailsComments.module.scss'
import {Text, TextSize} from "@/shared/ui/Text/Text";
import {AddCommentForm} from "@/features/addCommentForm";
import {CommentList} from "@/entities/Comment";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {getArticleComments} from "@/pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice";
import {getArticleRecommendations} from "@/pages/ArticleDetailsPage/model/slices/articleDetailsPageRecommendationsSlice";
import {getArticleCommentsIsLoading} from "@/pages/ArticleDetailsPage/model/selectors/comments";
import {getArticleRecommendationsIsLoading} from "@/pages/ArticleDetailsPage/model/selectors/recommendations";
import {useCallback} from "react";
import {addCommentForArticle} from "@/pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useInitialEffect} from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import {
    fetchCommentsByArticleId
} from "@/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

interface ArticleDetailsCommentsProps {
    className?: string;
    id:string;
}

export const ArticleDetailsComments = ({className,id}: ArticleDetailsCommentsProps) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch()
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });
    return (
        <div className={''}>
            <Text
                size={TextSize.L}
                className={cls.commentTitle}
                title={t('Комментарии')}
            />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </div>
    );
};

