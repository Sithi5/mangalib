// Import Jest Native matchers
import '@testing-library/jest-native/extend-expect';

import dotenv from 'dotenv';

dotenv.config();

import 'tests/__mocks__/expo-constants.mock';
import 'tests/__mocks__/firebase/firebase-app.mock';
import 'tests/__mocks__/firebase/firebase-firestore.mock';
import 'tests/__mocks__/firebase/firebase-auth.mock';
import 'tests/__mocks__/expo-vector-icons.mock';
