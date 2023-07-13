import cls from './AdminPanelPage.module.scss'
import {useTranslation} from "react-i18next";

interface AdminPanelPageProps {
    className?: string;
}

 const AdminPanelPage = (props: AdminPanelPageProps) => {
    const {className} = props;
    const {t} = useTranslation('admin');

    return (
        <div className={''}>

        </div>
    );
};

export default AdminPanelPage;

