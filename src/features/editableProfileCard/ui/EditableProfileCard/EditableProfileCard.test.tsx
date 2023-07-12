import {fireEvent, screen} from '@testing-library/react';
import {componentRender} from 'shared/lib/tests/componentRender/componentRender';
import {EditableProfileCard} from "features/editableProfileCard";
import {Profile} from "entities/Profile";
import {Currency} from "entities/Currency";
import {Country} from "entities/Country";
import {profileReducer} from "features/editableProfileCard/model/slice/profileSlice";
import userEvent from '@testing-library/user-event'
import {$api} from "shared/api/api";

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 465,
    currency: Currency.USD,
    country: Country.Kazakhstan,
    city: 'Moscow',
    username: 'admin213'
};
const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile
        },
        user: {
            authData: {id: '1', username: 'admin', lastname: 'admin'}
        }
    },
    asyncReducers: {
        profile: profileReducer
    }
}
test('Readonly should switch', async () => {
    componentRender(<EditableProfileCard id={'1'}/>, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
});
test('Whilst cancel values should be resetted', async () => {
    componentRender(<EditableProfileCard id={'1'}/>, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin')
})
test('Should return error', async () => {
    componentRender(<EditableProfileCard id={'1'}/>, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
})


test('Should return PUT request', async () => {
    const mockPutReq = jest.spyOn($api, 'put')

    componentRender(<EditableProfileCard id={'1'}/>, options)
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

    expect(mockPutReq).toHaveBeenCalled();
})
