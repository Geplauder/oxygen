import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { Provider } from 'react-redux'
import { rootReducer, rootMiddleware, RootState } from '../app/store';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';


function render(
    ui: React.ReactElement,
    {
        preloadedState,
        store = configureStore({ reducer: rootReducer, middleware: rootMiddleware, preloadedState }),
        ...renderOptions
    }: { preloadedState?: Partial<RootState>, store?: EnhancedStore } = {}
) {
    function Wrapper({ children }: { children?: React.ReactNode }) {
        return <Provider store={store}>{children}</Provider>
    }

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';

export { render }