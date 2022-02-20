export type Args = {
    source_object: Object;
};

export default function deepCopy({ source_object }: Args) {
    return JSON.parse(JSON.stringify(source_object));
}
