export type Args = {
    str: string;
    find: string;
    replace: string;
};

export default function replaceAll({ str, find, replace }: Args): string {
    return str.replace(new RegExp(find, 'g'), replace);
}
