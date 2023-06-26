export default jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
    getAuth: jest.fn(() => ({
        currentUser: {},
        onAuthStateChanged: jest.fn(),
        signOut: jest.fn(),
    })),
}));
