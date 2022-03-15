import { Alert } from 'react-native';

type Args = {
    title: string;
    message: string;
    alertYesFunction: <T>(args?: T) => Promise<any>;
};

/** This alert return a Promise<boolean> with value true if user reply yes and false if no.*/
export default async function asyncAlert(args: Args): Promise<boolean> {
    const { title, message, alertYesFunction } = args;
    const response = await new Promise<boolean>((resolve) => {
        Alert.alert(title, message, [
            {
                text: 'No',
                onPress: () => {
                    resolve(false);
                },
                style: 'cancel',
            },
            {
                text: 'Yes',
                onPress: async () => {
                    try {
                        await alertYesFunction();
                        resolve(true);
                    } catch (error: any) {
                        resolve(false);
                        throw error;
                    }
                },
            },
        ]);
    }).then((ret) => {
        return ret;
    });
    return response;
}
