import cls from './ArticleDetailPage.module.scss'
import {memo} from "react";

interface ArticleDetailPageProps {
    className?: string;
}

const ArticleDetailPage = ({className}: ArticleDetailPageProps) => {
    return (
        <div className={''}>
            Article Details page
        </div>
    );
};

export default memo(ArticleDetailPage)
