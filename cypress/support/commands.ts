import {login} from "./commands/login";
import * as profileCommands from './commands/profile';

Cypress.Commands.add('login', login)
Cypress.Commands.addAll(profileCommands);

