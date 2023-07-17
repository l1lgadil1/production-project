import cls from './popup.module.scss'
import {DropdownDirection} from "@/shared/types/ui";

export const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.bottomLeft,
    'bottom right': cls.bottomLeft,
    'top left': cls.topLeft,
    'top right': cls.topRight
}
