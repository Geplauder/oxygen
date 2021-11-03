import React from 'react';

import { render, screen, fireEvent, getDummyStore } from '../utility/testUtils';
import MessageBox from './MessageBox';
import { store } from '../app/store';

describe('MessageBox', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('shows selected channel name as a placeholder', () => {
        const { dummyData } = getDummyStore();
        render(<MessageBox selectedChannel={dummyData.firstChannel} />);

        const inputElement = screen.getByPlaceholderText(new RegExp(`Message #${dummyData.firstChannel.name}`, "i"));
        expect(inputElement).toBeInTheDocument();
    });

    it('sets message on input change', () => {
        const { dummyData } = getDummyStore();

        const setState = jest.fn();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const useStateMock: any = (initState: any) => [initState, setState];
        jest.spyOn(React, 'useState').mockImplementation(useStateMock);

        render(<MessageBox selectedChannel={dummyData.firstChannel} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'foobar' } });

        expect(setState).toHaveBeenCalledWith('foobar');
    });

    // it('dispatches postMessageAsync action on enter keypress', () => {
    //     const { dummyData } = getDummyStore();

    //     const dispatchMock = jest.fn();
    //     store.dispatch = dispatchMock;

    //     render(<MessageBox selectedChannel={dummyData.firstChannel} />, { store });

    //     const inputElement = screen.getByRole('textbox');
    //     fireEvent.change(inputElement, { target: { value: 'foobar' } });
    //     fireEvent.keyDown(inputElement, { key: 'Enter' });

    //     expect(dispatchMock).toBeCalledTimes(1);
    // });

    it('does not dispatch postMessageAsync action on enter keypress if message is empty', () => {
        const { dummyData } = getDummyStore();

        const dispatchMock = jest.fn();
        store.dispatch = dispatchMock;

        render(<MessageBox selectedChannel={dummyData.firstChannel} />, { store });

        const inputElement = screen.getByRole('textbox');
        fireEvent.keyDown(inputElement, { key: 'Enter' });

        expect(dispatchMock).toBeCalledTimes(0);
    });

    it('does not dispatch postMessageAsync action if keypress is not enter', () => {
        const { dummyData } = getDummyStore();

        const dispatchMock = jest.fn();
        store.dispatch = dispatchMock;

        render(<MessageBox selectedChannel={dummyData.firstChannel} />, { store });

        const inputElement = screen.getByRole('textbox');
        fireEvent.keyDown(inputElement, { key: 'Return' });

        expect(dispatchMock).toBeCalledTimes(0);
    });
});