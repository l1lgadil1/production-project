import {RouteProps} from 'react-router-dom';
import {MainPage} from '@/pages/MainPage';
import {AboutPage} from '@/pages/AboutPage';
import {NotFoundPage} from '@/pages/NotFoundPage';
import {ArticlesPage} from '@/pages/ArticlesPage';
import {ArticleDetailsPage} from '@/pages/ArticleDetailsPage';
import {ArticleEditPage} from '@/pages/ArticleEditPage';
import {AdminPanelPage} from "@/pages/AdminPanelPage";
import {UserRole} from "@/entities/User";
import {ForbiddenPage} from "@/pages/ForbiddenPage";
import ProfilePage from "@/pages/profilePage/ui/ProfilePage";

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEl = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => '/profile/' + id;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string) => '/articles/' + id;
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdminPanel = () => '/admin';
export const getRouteForbidden = () => '/forbidden';

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: getRouteMain(),
    [AppRoutes.ABOUT]: getRouteAbout(),
    [AppRoutes.PROFILE]: getRouteProfile(':id'),
    [AppRoutes.ARTICLES]: getRouteArticles(),
    [AppRoutes.ARTICLE_DETAILS]: getRouteArticleDetails(':id'), // + :id
    [AppRoutes.ARTICLE_CREATE]: getRouteArticleCreate(),
    [AppRoutes.ARTICLE_EDIT]: getRouteArticleEdit(':id'),
    [AppRoutes.ADMIN_PANEl]: getRouteAdminPanel(),
    [AppRoutes.FORBIDDEN]: getRouteForbidden(),
    // последний
    [AppRoutes.NOT_FOUND]: '*',
};


export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage/>,
    },
    [AppRoutes.ABOUT]: {
        path:getRouteAbout(),
        element: <AboutPage/>,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage/>,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage/>,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage/>,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path:  getRouteArticleCreate(),
        element: <ArticleEditPage/>,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage/>,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEl]: {
        path: getRouteAdminPanel(),
        element: <AdminPanelPage/>,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER]
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage/>
    },
    // last
    [AppRoutes.NOT_FOUND]:
        {
            path:'*',
            element: <NotFoundPage/>,
        }
}

