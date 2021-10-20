import React from 'react';
import { Channel } from '../types';

import { render, screen, fireEvent } from '../utility/testUtils';
import faker from 'faker';
import MessageBox from './MessageBox';
import { store } from '../app/store';

const CHANNEL: Channel = {
    id: faker.datatype.uuid(),
    name: faker.lorem.word(),
    server_id: faker.datatype.uuid(),
    created_at: faker.date.past().toString(),
    updated_at: faker.date.past().toString(),
};

describe('MessageBox', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('shows selected channel name as a placeholder', () => {
        render(<MessageBox selectedChannel={CHANNEL} />);

        const inputElement = screen.getByPlaceholderText(new RegExp(`Message #${CHANNEL.name}`, "i"));
        expect(inputElement).toBeInTheDocument();
    });

    it('sets message on input change', () => {
        const setState = jest.fn();
        const useStateMock: any = (initState: any) => [initState, setState];
        const x = jest.spyOn(React, 'useState').mockImplementation(useStateMock);

        render(<MessageBox selectedChannel={CHANNEL} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foobar' } });

        expect(setState).toHaveBeenCalledWith('foobar');
    });

    it('dispatches postMessageAsync action on enter keypress', () => {
        
        const dispatchMock = jest.fn();
        store.dispatch = dispatchMock;

        render(<MessageBox selectedChannel={CHANNEL} />, { store });

        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'foobar' } });
        fireEvent.keyDown(inputElement, { key: 'Enter' });

        expect(dispatchMock).toBeCalledTimes(1);
    });

    it('does not dispatch postMessageAsync action on enter keypress if message is empty', () => {
        
        const dispatchMock = jest.fn();
        store.dispatch = dispatchMock;

        render(<MessageBox selectedChannel={CHANNEL} />, { store });

        const inputElement = screen.getByRole('textbox');
        fireEvent.keyDown(inputElement, { key: 'Enter' });

        expect(dispatchMock).toBeCalledTimes(0);
    });

    it('does not dispatch postMessageAsync action if keypress is not enter', () => {
        
        const dispatchMock = jest.fn();
        store.dispatch = dispatchMock;

        render(<MessageBox selectedChannel={CHANNEL} />, { store });

        const inputElement = screen.getByRole('textbox');
        fireEvent.keyDown(inputElement, { key: 'Return' });

        expect(dispatchMock).toBeCalledTimes(0);
    });
});