import useSWR, { Fetcher } from "swr";
import type { PublicConfiguration, BareFetcher } from "swr/_internal";

export function useClientFetching<Data>(
  path: string,
  config?: Partial<PublicConfiguration<Data, Error, BareFetcher<Data>>>,
) {
  const fetcher: Fetcher<Data, string> = async (query) => {
    const res = await fetch(path);

    if (!res.ok) {
      const errorText = await res.text();

      throw new Error(errorText);
    }

    const json = (await res.json()) as Data;

    return json;
  };

  return useSWR<Data, Error>(path, fetcher, config);
}
