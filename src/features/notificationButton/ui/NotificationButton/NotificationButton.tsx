import cls from './NotificationButton.module.scss'
import {Popover} from "shared/ui/Popups";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Icon} from "shared/ui/Icon/Icon";
import NotificationIcon from "shared/assets/icons/notification-20-20.svg";
import {NotificationList} from "entities/Notification";
import React from "react";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = ({className}: NotificationButtonProps) => {
    return (
            <Popover
                // direction={'bottom left'}
                trigger={<Button theme={ButtonTheme.CLEAR}>
                    <Icon inverted Svg={NotificationIcon}/>
                </Button>}
            >
                <NotificationList className={cls.notifications} />
            </Popover>
    );
};

