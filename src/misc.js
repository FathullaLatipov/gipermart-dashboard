export function renderCollection(
    collection,
    renderItem,
    renderEmpty,
) {
    if (collection === undefined) {
      return renderItem(undefined, undefined, collection);
    }
    if (collection.length === 0) {
      return !!renderEmpty ? renderEmpty(collection) : null;
    }
    return collection.map(renderItem);
}