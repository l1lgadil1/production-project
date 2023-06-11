import {classNames} from "shared/lib/classNames/classNames";
import cls from './Text.module.scss'

export enum TextTheme {
    PRIMARY =    'primary',
    ERROR =  'error'
}
interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?:TextTheme;

}

export const Text = (props: TextProps) => {
    const {className, title, text} = props;
    return (
        <div className={classNames(cls.Text, {}, [className])}>
            {title && <p className={cls.title}></p>}
            {text && <p className={cls.text}></p>}
        </div>
    );
};

