import cls from './StarRating.module.scss'
import {Icon} from "@/shared/ui/Icon/Icon";
import StarIcon from '../../assets/icons/star-20-20.svg'
import {classNames} from "@/shared/lib/classNames/classNames";
import {useState} from "react";

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = (props: StarRatingProps) => {
    const {className, size = 30, selectedStars = 0, onSelect} = props;

    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
    console.log(currentStarsCount)
    const clsMode: Record<string, string | boolean> = {}

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount)
        }
    }
    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0)
        }
    }
    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true)
        }
    }

    return (
        <div className={''}>
            {stars.map((starNumber) => (
                <Icon
                    className={classNames(cls.StarIcon, clsMode, [currentStarsCount >= starNumber ? cls.hovered : cls.normal])}
                    Svg={StarIcon}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            ))}
        </div>
    );
};

