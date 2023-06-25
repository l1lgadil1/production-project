import cls from './CommentList.module.scss'
import {Comment} from "entities/Comment";
import {useTranslation} from "react-i18next";
import {Text} from "shared/ui/Text";
import {CommentCard} from "../CommentCard/CommentCard";

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = (props: CommentListProps) => {
    const {className, comments,isLoading} = props;
    const {t} = useTranslation()
    return (
        <div className={''}>
            {comments?.length
                ? comments.map(comment => (
                    <CommentCard isLoading={isLoading} className={cls.comment} comment={comment} />
                ))
                : <Text text={t("Комментарии отсутствуют")}/>
            }
        </div>
    );
};

