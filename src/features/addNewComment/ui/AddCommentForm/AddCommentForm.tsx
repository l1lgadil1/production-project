import cls from './AddCommentForm.module.scss'
import {Input} from "@/shared/ui/Input";
import {useTranslation} from "react-i18next";
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {useSelector} from "react-redux";
import {
    getAddNewCommentError,
    getAddNewCommentText
} from "@/features/addNewComment/model/selectors/addNewCommentSelectors";
import {useCallback} from "react";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {addNewCommentActions, addNewCommentReducers} from "@/features/addNewComment/model/slice/addNewComment";
import {DynamicModuleLoader, ReducersList} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

export interface AddCommentFormProps {
    className?: string;
    onSendComment:(text:string)=>void;
}

const reducers: ReducersList = {
    addCommentForm: addNewCommentReducers
}
const AddCommentForm = ({className,onSendComment}: AddCommentFormProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const text = useSelector(getAddNewCommentText)
    const error = useSelector(getAddNewCommentError)

    const onCommentTextChange = useCallback((value: string) => {
        dispatch(addNewCommentActions.setText(value))
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        onSendComment(text || '')
        onCommentTextChange('')
    }, [onSendComment,onCommentTextChange,text]);


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={cls.AddCommentForm}>
                <Input onChange={onCommentTextChange} value={text} placeholder={t('Введите комментарий')}
                       className={cls.input}/>
                <Button onClick={onSendHandler} theme={ButtonTheme.OUTLINE}>
                    {t('Отправить')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
};

export default AddCommentForm;
