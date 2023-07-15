import cls from './Popover.module.scss'
import {Button} from "shared/ui/Button/Button";
import {ReactNode, useState} from "react";
import {DropdownDirection} from "shared/types/ui";
import {mapDirectionClass} from "shared/ui/Popups/styles/consts";
import {classNames} from "shared/lib/classNames/classNames";

interface PopoverProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropdownDirection;
    children?: ReactNode;
}

export const Popover = (props: PopoverProps) => {
    const {className, children, direction = 'bottom right', trigger} = props;
    const menuClasses = [mapDirectionClass[direction]];
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <div className={cls.Popover}>
            <Button className={cls.trigger} onClick={() => setIsOpen(p => !p)}>{trigger}</Button>
            {isOpen && <ul className={classNames(cls.panel,{},menuClasses)}>
                {children}
            </ul>}
        </div>
    );
};

