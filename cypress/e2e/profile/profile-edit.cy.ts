import {selectByTestId} from "../../helpers/selectByTestId";

let profileId='';

describe('Opens profile page', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit('/profile/' + data?.id);
        })
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    })
    it('successful loading', () => {
        cy.get(selectByTestId('ProfileCard.firstname')).should('have.value', 'asdasdasdadasd22')
    })

    it('Edit profile', function () {
        cy.updateProfile();
        cy.get(selectByTestId('ProfileCard.firstname')).should('have.value', 'firstname');
        cy.get(selectByTestId('ProfileCard.lastname')).should('have.value', 'lastname');
    });
})
