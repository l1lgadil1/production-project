import cls from './RatingCard.module.scss'
import {Card} from "@/shared/ui/Card/Card";
import {HStack, VStack} from "@/shared/ui/Stack";
import {useCallback, useState} from "react";
import {StarRating} from "@/shared/ui/StarRating/StarRating";
import {Modal} from "@/shared/ui/Modal/Modal";
import {Input} from "@/shared/ui/Input";
import {Text} from '@/shared/ui/Text'
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {useTranslation} from "react-i18next";
import {BrowserView, MobileView} from "react-device-detect";
import {Drawer} from "@/shared/ui/Drawer/Drawer";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = (props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept,
        rate = 0,
    } = props;

    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarCount: number) => {
        setStarsCount(selectedStarCount);
        if (hasFeedback) {
            setIsModalOpen(true)
        } else {
            onAccept?.(selectedStarCount)
        }
    }, [hasFeedback, onAccept]);

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback)
    }, [feedback, onAccept, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount)
    }, [onCancel, starsCount]);

    const modalContent = <VStack max gap={'32'}>
        <Text title={feedbackTitle}/>
        <Input placeholder={"Ваш отзыв"} onChange={setFeedback}/>
        <HStack gap={'16'} justify={'end'}>
            <Button onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>
                {t('Закрыть')}
            </Button>
            <Button onClick={acceptHandler}>
                {t('Отправить')}
            </Button>
        </HStack>
    </VStack>

    return (
        <Card className={''}>
            <VStack align={'center'} gap={'8'}>
                <Text title={starsCount ? t('Спасибо за оценку!') : title}/>
                <StarRating selectedStars={starsCount} onSelect={onSelectStars}/>
            </VStack>

            <BrowserView>
                <Modal isOpen={isModalOpen} className={cls.modal}>
                    {modalContent}
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} className={cls.modal}>
                    {modalContent}
                </Drawer>
            </MobileView>
        </Card>
    );
};

