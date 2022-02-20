export type ReplaceAllArgs = {
    str: string;
    find: string;
    replace: string;
};

export default function replaceAll({
    str,
    find,
    replace,
}: ReplaceAllArgs): string {
    return str.replace(new RegExp(find, 'g'), replace);
}
