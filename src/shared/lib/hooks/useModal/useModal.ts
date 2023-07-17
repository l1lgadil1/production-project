import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import {useTheme} from "@/app/providers/ThemeProvider";
import {Mods} from "@/shared/lib/classNames/classNames";
import cls from "@/shared/ui/Modal/Modal.module.scss";


interface useModalProps{
    onClose?:()=>void;
    isOpen?:boolean;
    lazy?:boolean;
    animationDelay:number
}

export function useModal(props:useModalProps) {
    const {
        onClose,
        isOpen,
        lazy,
        animationDelay
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
    const {theme} = useTheme();

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [onClose,animationDelay]);

    // Новые ссылки!!!
    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return{
        isClosing,
        isMounted,
        closeHandler
    }
}
