import '@testing-library/jest-dom'

window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: () => null,
    disconnect: () => null,
}));

window.HTMLElement.prototype.scrollIntoView = () => ({});

jest.mock('jdenticon', () => ({
    update: () => null,
}));

jest.mock('remark-breaks', () => ({}));