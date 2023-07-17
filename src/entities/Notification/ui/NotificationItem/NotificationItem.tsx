import cls from './NotificationItem.module.scss'
import {Notification} from "../../model/types/notifications";
import {Card, CardTheme} from "@/shared/ui/Card/Card";
import {Text} from "@/shared/ui/Text/Text";

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = ({className, item}: NotificationItemProps) => {
    const content = (
        <Card theme={CardTheme.OUTLINED} className={cls.NotificationItem}>
            <Text title={item.title} text={item.description}/>
        </Card>
    )


    if (item.href) {
        return <a className={cls.link} target={"_blank"} href={item.href}>
            {content}
        </a>
    }

    return content;
};

