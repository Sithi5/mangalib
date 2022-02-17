export function mockSuccess(value: Object) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), 2000);
    });
}

export function mockFailure(value: Object) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(value), 2000);
    });
}

type LoginArgs = {
    email: string;
    password: string;
    shouldSucceed: boolean;
};

export function login({ email, password, shouldSucceed = true }: LoginArgs) {
    console.log(email, password);
    if (!shouldSucceed) {
        return mockFailure({ error: 500, message: 'Something went wrong!' });
    }

    return mockSuccess({ auth_token: 'successful_fake_token' });
}

function getAuthenticationToken() {
    return 'successful_fake_token';
}
