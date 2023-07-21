import cls from './AvatarDropdown.module.scss'
import {Avatar} from "@/shared/ui/Avatar/Avatar";
import {getRouteAdminPanel, getRouteProfile, RoutePath} from "@/shared/config/routeConfig/routeConfig";
import {Dropdown} from "@/shared/ui/Popups";
import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import {getUserAuthData, isUserAdmin, isUserManager, userActions} from "@/entities/User";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = ({className}: AvatarDropdownProps) => {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const isAdminPanelAvailable = isAdmin || isManager;

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);


    if (!authData) return null;

    return (
        <Dropdown className={cls.Dropdown}
                  direction="bottom left"
                  trigger={<Avatar src={authData?.avatar} size={30}/>}
                  items={[
                      ...(isAdminPanelAvailable ? [{
                          content: t('Админ панель'),
                          href: getRouteAdminPanel()
                      }] : []),
                      {
                          content: t('Мой профиль'),
                          href: getRouteProfile(authData.id)
                      },
                      {
                          content: t('Выйти'),
                          onClick: onLogout
                      },

                  ]}
        />
    );
};

