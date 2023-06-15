import {Profile} from "entities/Profile";
import {ValitdateProfileError} from "entities/Profile/model/types/profile";

export const validateProfileData = (profile: Profile) => {
    const {first, lastname, age, country} = profile;
    if (!profile) {
        return [ValitdateProfileError.NO_DATA]
    }
    const errors: ValitdateProfileError[] = [];

    if (!first || !lastname) errors.push(ValitdateProfileError.INCORRECT_USER_DATA)

    if (!age || !Number.isInteger(age)) errors.push(ValitdateProfileError.INCORRECT_AGE)
    if (!country) errors.push(ValitdateProfileError.INCORRECT_COUNTRY)

    return errors;
}
