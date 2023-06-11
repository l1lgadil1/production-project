import {FC, lazy} from 'react';
import {LoginSchema} from "features/AuthByUsername";

export const LoginFormAsync = lazy<FC<LoginSchema>>(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
    setTimeout(() => resolve(import('./LoginForm')), 1500);
}));
