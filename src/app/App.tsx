import React, {Suspense, useEffect} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import {useTheme} from '@/app/providers/ThemeProvider';
import {AppRouter} from '@/app/providers/router';
import {Navbar} from '@/widgets/Navbar';
import {Sidebar} from '@/widgets/Sidebar';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInited, userActions} from '@/entities/User';
import {MainLayout} from "@/shared/layouts/MainLayout";

function App() {
    const {theme} = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app_redesigned', {}, [theme])}>
            <Suspense fallback="">
                <MainLayout
                    header={<Navbar/>}
                    content={<AppRouter/>}
                    sidebar={<Sidebar/>}
                    toolbar={<div>123</div>}
                />
            </Suspense>
        </div>
    );
}

export default App;
