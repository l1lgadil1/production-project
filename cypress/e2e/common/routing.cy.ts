import {selectByTestId} from "../../helpers/selectByTestId";

describe('template spec', () => {
    describe('user should not be authorized', () => {
        it('Opens main page', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist')
        })
        it('Opens profile Page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist')
        })
        it('Opens not existing route', () => {
            cy.visit('/profiles1231231231');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        })
    })
    describe('user should be authorized', () => {
        beforeEach(() => {
            cy.login('admin', '123');
        })
        it('Opens profile page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        })
        it('Opens Articles page', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        })

    })
})

