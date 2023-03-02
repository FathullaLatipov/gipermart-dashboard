export function categoriesAlgo(categories) {
    const result = [];
    const map = {};
    for (const category of categories) {
      map[category.id] = category;
      category.children = [];
    }
    for (const category of categories) {
      if (category.parent) {
        map[category.parent].children.push(category);
      } else {
        category.isParent = true;
      }
      result.push(category);
    }
    return result;
}