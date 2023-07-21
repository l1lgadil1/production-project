import {classNames, Mods} from '@/shared/lib/classNames/classNames';
import {CSSProperties, useMemo} from 'react';
import cls from './Avatar.module.scss';
import {AppImage} from "@/shared/ui/AppImage";
import UserIcon from '@/shared/assets/icons/user-icon-20-20.svg'
import {Skeleton} from "@/shared/ui/Skeleton/Skeleton";
import {Icon} from "@/shared/ui/Icon/Icon";

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = ({
                           className, src, size, alt,
                       }: AvatarProps) => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    const errorFallback = <Icon Svg={UserIcon}/>
    return (
        <AppImage
            fallback={<Skeleton className={cls.Avatar} width={20} height={20}/>}
            errorFallback={errorFallback}
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
};
