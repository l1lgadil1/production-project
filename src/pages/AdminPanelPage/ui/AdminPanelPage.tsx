import cls from './AdminPanelPage.module.scss'
import {useTranslation} from "react-i18next";
import {Page} from "widgets/Page/Page";

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = (props: AdminPanelPageProps) => {
    const {className} = props;
    const {t} = useTranslation('admin');

    return (
        <Page className={''}>
            Admin panel
        </Page>
    );
};

export default AdminPanelPage;

