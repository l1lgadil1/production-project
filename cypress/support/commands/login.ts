import {USER_LOCALSTORAGE_KEY} from "@/shared/const/localstorage";
import {User} from "@/entities/User";

export const login = (username: string = 'user', password: string = '123') => {
    return cy.request({
        method: "POST",
        url: 'http://localhost:8000/login',
        body: {
            username,
            password
        }
    }).then(({body}) => {
        window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body))
        return body;
    })
}

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<User>
        }
    }
}

export {};

