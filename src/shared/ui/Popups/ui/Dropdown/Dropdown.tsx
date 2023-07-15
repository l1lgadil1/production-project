import cls from './Dropdown.module.scss'
import {classNames} from "shared/lib/classNames/classNames";
import {Button} from "shared/ui/Button/Button";
import {memo, ReactNode, useState} from "react";
import {DropdownDirection} from "shared/types/ui";
import {AppLink} from "shared/ui/AppLink/AppLink";
import {mapDirectionClass} from "shared/ui/Popups/styles/consts";

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
}


export const Dropdown = memo((props: DropdownProps) => {
    const {className, items, trigger, direction = 'bottom right'} = props;
    const menuClasses = [mapDirectionClass[direction]];
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>();

   const onHandleClick = (callback?:()=>void) =>{
       callback?.();
       setIsOpen(p=>!p);
   }
    return (
        <div className={classNames(cls.Dropdown, {}, [className])}>
            <Button onClick={() => setIsOpen(p => !p)} className={cls.btn}>{
                trigger
            }</Button>
            {isOpen && <ul className={classNames(cls.menu, {}, menuClasses)}>
                {items.map(item => {
                    const content = <Button onClick={()=> onHandleClick(item?.onClick)} className={classNames(cls.item, {
                        [cls.active]: activeIndex === 0,
                        [cls.disabled]: item.disabled,
                    }, [])}>
                        {item.content}
                    </Button>

                    if (item.href) {
                        return <AppLink to={item.href}>
                            {content}
                        </AppLink>
                    }

                    return <>
                        {content}
                    </>
                })}
            </ul>
            }
        </div>
    )
})

