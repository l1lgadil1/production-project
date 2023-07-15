import cls from './NotificationList.module.scss'
import {useNotifications} from "entities/Notification/api/notificationApi";
import {VStack} from "shared/ui/Stack";
import {NotificationItem} from "../NotificationItem/NotificationItem";
import {classNames} from "shared/lib/classNames/classNames";
import {Skeleton} from "shared/ui/Skeleton/Skeleton";

interface NotificationListProps {
    className?: string;
}

export const  NotificationList = ({className}: NotificationListProps) => {
    const {data, isLoading} = useNotifications(null,{
        pollingInterval:5000
    });

    if (isLoading) {
        return <VStack
            gap={'8'}
            className={classNames(cls.NotificationList, {}, [className])}
        >
           <Skeleton width={'100%'} border={'8px'} height={'80px'} />
           <Skeleton width={'100%'} border={'8px'} height={'80px'} />
           <Skeleton width={'100%'} border={'8px'} height={'80px'} />
        </VStack>
    }

    return (
        <VStack
            gap={'8'}
            className={classNames('', {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem className={cls.NotificationList} key={item.id} item={item}/>
            ))}
        </VStack>
    );
};

