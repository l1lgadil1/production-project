import cls from './Drawer.module.scss'
import {Portal} from "shared/ui/Portal/Portal";
import {classNames} from "shared/lib/classNames/classNames";
import {ReactNode} from "react";
import {Overlay} from "shared/ui/Overlay/Overlay";
import {useModal} from "shared/lib/hooks/useModal/useModal";

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = ({className, children, isOpen, onClose}: DrawerProps) => {

    const {closeHandler, isClosing, isMounted} = useModal({animationDelay: 300, isOpen, onClose})

    return (
        <Portal>
            <div className={classNames(cls.Drawer, {[cls.opened]: isOpen}, [className])}>
                <Overlay onClick={closeHandler}/>
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

