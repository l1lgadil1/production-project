import cls from './SidebarItem.module.scss'
import {AppLink, AppLinkTheme} from "shared/ui/AppLink/AppLink";
import {useTranslation} from "react-i18next";
import {SidebarItemType} from "src/widgets/Sidebar/model/items";
import {memo} from "react";

interface SidebarItemProps {
    item?: SidebarItemType
    collapsed: boolean
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const {item, collapsed} = props;
    const {t} = useTranslation()
    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
            className={cls.item}
        >
            <item.Icon className={cls.icon}/>
            <span className={cls.link}>
                        {t(item.text)}
            </span>
        </AppLink>
    );
});

