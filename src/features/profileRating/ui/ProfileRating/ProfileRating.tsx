import cls from './ProfileRating.module.scss'
import {RatingCard} from "@/entities/Rating/ui/RatingCard/RatingCard";
import {useGetProfileRating, useRateProfileRating} from "@/features/profileRating/api/profileRatingApi";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";
import {useCallback} from "react";

interface ProfileRatingProps {
    className?: string;
    profileId: string;
}

export const ProfileRating = (props: ProfileRatingProps) => {
    const {className, profileId} = props;
    const userData = useSelector(getUserAuthData);

    const {data, isLoading} = useGetProfileRating({
        profileId,
        userId: userData?.id ?? '',
    });
    const rating = data?.[0];
    const isRateble = profileId !== userData?.id;
    const [rateProfileMutation] = useRateProfileRating();

    const handleProfileRate = useCallback((rateCount: number, feedback?: string) => {
        try {
            rateProfileMutation({
                userId: userData?.id ?? '',
                profileId,
                rate: rateCount,
                feedback
            })
        } catch (err) {
            console.log(err)
        }
    }, []);


    const onCancel = useCallback((rateCount: number) => {
        handleProfileRate(rateCount);
    }, [handleProfileRate]);

    const onAccept = useCallback((rateCount: number, feedback?: string) => {
        handleProfileRate(rateCount, feedback);
    }, [handleProfileRate]);


    if (isRateble && isLoading) {
        return <Skeleton width="100%" height={120}/>
    }

    if (profileId && isRateble) {
        return (
            <RatingCard
                onCancel={onCancel}
                onAccept={onAccept}
                rate={rating?.rate}
                title="Оцените пользователя"
                feedbackTitle="Оставьте отзыв об пользователе"
                hasFeedback
            />
        );
    } else {
        return null;
    }
};

