import {classNames} from 'shared/lib/classNames/classNames';
import {AppLink, AppLinkTheme} from 'shared/ui/AppLink/AppLink';
import {useTranslation} from 'react-i18next';
import cls from './Navbar.module.scss';
import React, {useCallback, useState} from "react";
import {Modal} from "shared/ui/Modal/Modal";
import {Button, ThemeButton} from "shared/ui/Button/Button";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    const {t} = useTranslation();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const onToggleModal = useCallback(() => {
        setIsAuthModalOpen(p=>!p)
    }, [])

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>
                <Button theme={ThemeButton.CLEAR_INVERTED} onClick={onToggleModal}>
                    {t('Войти')}
                </Button>
                <AppLink theme={AppLinkTheme.SECONDARY} to="/" className={cls.mainLink}>
                    {t('Главная')}
                </AppLink>
                <AppLink theme={AppLinkTheme.RED} to="/about">
                    {t('О сайте')}
                </AppLink>
            </div>
            <Modal onClose={onToggleModal} isOpen={isAuthModalOpen}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias beatae dolorem repellat tempore.
                Aspernatur dolorem, ducimus eius explicabo minima, nulla obcaecati perspiciatis provident quo recusandae
                repellendus reprehenderit sapiente, similique.
            </Modal>
        </div>
    );
};
