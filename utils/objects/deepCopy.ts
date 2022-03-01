export type Args = {
    source_object: Object;
};

/** deep copy any source object using JSON methods and return the new object */
export default function deepCopy({ source_object }: Args) {
    return JSON.parse(JSON.stringify(source_object));
}
