import {classNames} from "shared/lib/classNames/classNames";
import cls from './Modal.module.scss'
import {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {Portal} from "shared/ui/Portal/Portal";
import {useTheme} from "app/providers/ThemeProvider";

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

const ANIMATION_DELAY = 300;
export const Modal = (props: ModalProps) => {

    const {className, children, isOpen, onClose} = props;
    const {theme} = useTheme();

    const [isClosing, setIsClosing] = useState(false);
    const timeRef = useRef<ReturnType<typeof setTimeout>>(null);

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
        [cls[theme]]:true
    }
    const onHandleContent = (e: React.MouseEvent) => {
        e.stopPropagation()
    }


    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timeRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler()
        }
    }, [closeHandler])

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearInterval(timeRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])


    return (
       <Portal>
           <div className={classNames(cls.Modal, mods, [className])}>
               <div onClick={closeHandler} className={cls.overlay}>
                   <div onClick={onHandleContent} className={cls.content}>
                       {children}
                   </div>
               </div>
           </div>
       </Portal>
    );
};

