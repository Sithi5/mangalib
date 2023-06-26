export default jest.mock('expo-linking', () => ({
    ...jest.requireActual('expo-linking'),
    createURL: jest.fn(),
}));
