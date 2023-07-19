import {RatingCard} from "@/entities/Rating/ui/RatingCard/RatingCard";
import {useTranslation} from "react-i18next";
import {useGetArticleRating, useRateArticle} from "@/features/articleRating/api/articleRatingApi";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";
import {useCallback} from "react";

interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

export const ArticleRating = (props: ArticleRatingProps) => {
    const {className, articleId} = props;
    const {t} = useTranslation();
    const userData = useSelector(getUserAuthData);
    const {data, isLoading} = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });

    const rating = data?.[0];

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userData?.id ?? '',
                articleId,
                rate: starsCount,
                feedback
            })
        } catch (err) {
            console.log(err)
        }
    }, []);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount)
    }, [handleRateArticle]);
    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback)
    }, [handleRateArticle]);

    const [rateArticleMutation] = useRateArticle();

    if (isLoading) {
        return <Skeleton width="100%" height={120}/>
    }
    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            title="Оцените статью"
            feedbackTitle="Оставьте отзыв о статье"
            hasFeedback
        />
    );
};

