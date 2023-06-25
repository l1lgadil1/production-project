import {useEffect} from "react";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";

export function useInitialEffect(callback:()=>void){
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
        callback()
        }
    }, []);
}
