import { useCallback, useLayoutEffect, useState } from "react";

const query = ["(max-width: 767px)", "(min-width: 768px)"];

export function useMediaQuery() {
  const mediaQueryLists = query.map((q) => window.matchMedia(q));

  const getValues = useCallback(
    () => mediaQueryLists.map((mql) => mql.matches),
    [mediaQueryLists],
  );

  const [values, setValues] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueryLists.forEach((mql) => mql.addEventListener("change", handler));

    return () =>
      mediaQueryLists.forEach((mql) =>
        mql.removeEventListener("change", handler),
      );
  }, [mediaQueryLists, getValues]);

  return { isMobile: values[0], isDesktop: values[1] };
}
