import cls from './ForbiddenPage.module.scss'
import {Page} from "@/widgets/Page/Page";
import {useTranslation} from "react-i18next";

interface ForbiddenPageProps {
    className?: string;
}

 const ForbiddenPage = ({className}: ForbiddenPageProps) => {
    const {t} = useTranslation()
    return (
        <Page className={''}>
            {t('Недостаточно доступа.')}
        </Page>
    );
};

export default ForbiddenPage;
