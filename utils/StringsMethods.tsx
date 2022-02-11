import { ReplaceAllArgs } from './StringsMethodsTypes';

export function replaceAll({ str, find, replace }: ReplaceAllArgs): string {
    return str.replace(new RegExp(find, 'g'), replace);
}
