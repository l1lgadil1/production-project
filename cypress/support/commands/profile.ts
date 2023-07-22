import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage";
import {User} from "@/entities/User";
import {selectByTestId} from "../../helpers/selectByTestId";

export const updateProfile = (username: string = 'user', password: string = '123') => {
    cy.get(selectByTestId('EditableProfileCardHeader.EditButton')).click();
    cy.get(selectByTestId('ProfileCard.firstname')).clear().type('firstname');
    cy.get(selectByTestId('ProfileCard.lastname')).clear().type('lastname');
    cy.get(selectByTestId('EditableProfileCardHeader.SaveButton')).click();

}

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: "PUT",
        url: `http://localhost:8000/profile/${profileId}`,
        headers: {
            authorization: 'asdadasd'
        },
        body: {
            id: "1",
            first: "asdadq",
            lastname: "aswwww",
            age: 465,
            currency: "RUB",
            country: "Belarus",
            city: "Moscow",
            username: "admin213",
            avatar: "https://yt3.ggpht.com/ytc/AKedOLTYUJxG8Hu036PQ_TXpMLq2fG8Kj8NZI4h0lbn_3g=s900-c-k-c0x00ffffff-no-rj"
        }
    })

}


declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(): Chainable<void>,

            resetProfile(profileId:string): Chainable<void>
        }
    }
}

export {};

