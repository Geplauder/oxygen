import { CogIcon } from '@heroicons/react/solid';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';

import { render, screen, fireEvent } from '../../utility/testUtils';
import { Settings, SettingsButton, SettingsContent, SettingsLink, SettingsNavigation, SettingsNavigationBottom, SettingsNavigationTop } from './BaseSettings';

describe('SettingsButton', () => {
    it('renders provided text', () => {
        render(<SettingsButton onClick={() => null}>foobar</SettingsButton>);

        const buttonElement = screen.getByText(/foobar/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('renders provided icon', () => {
        const { container } = render(<SettingsButton onClick={() => null} icon={CogIcon} />);

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('has no special styling when isDanger is false', () => {
        render(<SettingsButton onClick={() => null}>foobar</SettingsButton>);

        const buttonElement = screen.getByText(/foobar/i);
        expect(buttonElement).toHaveClass('text-white');
    });

    it('has special styling when isDanger is true', () => {
        render(<SettingsButton onClick={() => null} isDanger={true}>foobar</SettingsButton>);

        const buttonElement = screen.getByText(/foobar/i);
        expect(buttonElement).toHaveClass('text-red-500');
    });

    it('calls onClick when button is clicked', () => {
        const onClickMock = jest.fn();

        render(<SettingsButton onClick={onClickMock} />);

        fireEvent.click(screen.getByRole('button'));

        expect(onClickMock).toBeCalledTimes(1);
    });
});

describe('SettingsLink', () => {
    it('renders provided text', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <SettingsLink to=''>foobar</SettingsLink>
            </Router>
        );

        const buttonElement = screen.getByText(/foobar/i);
        expect(buttonElement).toBeInTheDocument();
    });

    it('renders provided icon', () => {
        const history = createMemoryHistory();

        const { container } = render(
            <Router history={history}>
                <SettingsLink to='' icon={CogIcon} />
            </Router>
        );

        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });

    it('changes route on click', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <SettingsLink to='/foo/bar' />
            </Router>
        );

        fireEvent.click(screen.getByRole('link'));

        expect(history.location.pathname).toBe('/foo/bar');
    });
});

describe('Settings', () => {
    it('renders provided text', () => {
        render(<Settings>foobar</Settings>);

        const textElement = screen.getByText(/foobar/i);
        expect(textElement).toBeInTheDocument();
    });
});

describe('SettingsContent', () => {
    it('renders provided text', () => {
        const history = createMemoryHistory();

        render(
            <Router history={history}>
                <SettingsContent onGoBack={() => null}>
                    <SettingsLink to=''>foobar</SettingsLink>
                </SettingsContent>
            </Router>
        );

        const textElement = screen.getByText(/foobar/i);
        expect(textElement).toBeInTheDocument();
    });

    it('calls onGoBack when back button is pressed', () => {
        const history = createMemoryHistory();
        const onGoBackMock = jest.fn();

        render(
            <Router history={history}>
                <SettingsContent onGoBack={onGoBackMock} />
            </Router>
        );

        fireEvent.click(screen.getByRole('button'));

        expect(onGoBackMock).toBeCalledTimes(1);
    });
});

describe('SettingsNavigation', () => {
    it('renders provided text', () => {
        render(<SettingsNavigation>foobar</SettingsNavigation>);

        const textElement = screen.getByText(/foobar/i);
        expect(textElement).toBeInTheDocument();
    });
});

describe('SettingsNavigationTop', () => {
    it('renders provided text', () => {
        render(<SettingsNavigationTop>foobar</SettingsNavigationTop>);

        const textElement = screen.getByText(/foobar/i);
        expect(textElement).toBeInTheDocument();
    });
});

describe('SettingsNavigationBottom', () => {
    it('renders provided text', () => {
        render(<SettingsNavigationBottom>foobar</SettingsNavigationBottom>);

        const textElement = screen.getByText(/foobar/i);
        expect(textElement).toBeInTheDocument();
    });
});