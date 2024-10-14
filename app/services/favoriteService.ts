export function checkIsInFavorites(compilation: any) {
  const favorites = JSON.parse(String(localStorage.getItem("compilation")));
  if (favorites === null) {
    return false;
  }
  const result: boolean[] = favorites.map((favoriteCompilation: any) => {
    const result = Object.keys(favoriteCompilation).reduce(
      (acc, componentType) => {
        if (acc === false) {
          return false;
        }
        if (
          favoriteCompilation[componentType].length === 0 &&
          compilation[componentType].length === 0
        ) {
          return true;
        } else if (
          favoriteCompilation[componentType].length === 1 &&
          compilation[componentType].length === 1
        ) {
          if (
            compilation[componentType][0].id ===
            favoriteCompilation[componentType][0].id
          ) {
            return true;
          } else {
            return false;
          }
        } else if (
          favoriteCompilation[componentType].length ===
          compilation[componentType].length
        ) {
          const result = compilation[componentType].reduce(
            (acc: boolean, userCompilationProduct: any) => {
              if (acc === false) {
                return false;
              }
              const resultComparison = !!favoriteCompilation[
                componentType
              ].find((favoriteCompilationProduct: any) => {
                if (
                  favoriteCompilationProduct.id === userCompilationProduct.id
                ) {
                  return true;
                } else {
                  return false;
                }
              });
              return resultComparison;
            },
            true
          );

          return result;
        } else {
          return false;
        }
      },
      true
    );
    return result;
  });
  return result.some((element: boolean) => element);
}
