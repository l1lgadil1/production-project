import cls from './NotificationButton.module.scss'
import {Popover} from "shared/ui/Popups";
import {Button, ButtonTheme} from "shared/ui/Button/Button";
import {Icon} from "shared/ui/Icon/Icon";
import NotificationIcon from "shared/assets/icons/notification-20-20.svg";
import {NotificationList} from "entities/Notification";
import React, {useState} from "react";
import {Drawer} from "shared/ui/Drawer/Drawer";
import {BrowserView, MobileView} from 'react-device-detect';
import {AnimationProvider} from "shared/lib/components/AnimationProvider";

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = ({className}: NotificationButtonProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const onDrawerOpen = () => setIsDrawerOpen(true);
    const onDrawerClose = () => setIsDrawerOpen(false);

    const trigger = <Button onClick={onDrawerOpen} theme={ButtonTheme.CLEAR}>
        <Icon inverted Svg={NotificationIcon}/>
    </Button>;
    return (
        <div>
            <BrowserView>
                <Popover
                    // direction={'bottom left'}
                    trigger={trigger}
                >
                    <NotificationList className={cls.notifications}/>
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <AnimationProvider>
                    <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose}>
                        <NotificationList/>
                    </Drawer>
                </AnimationProvider>
            </MobileView>
        </div>
    );
};

