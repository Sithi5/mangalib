export default jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    getFirestore: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
}));
