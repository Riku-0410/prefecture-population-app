export const useFetch = <T>() => {
  const RESAS_API_END_POINT = process.env
    .NEXT_PUBLIC_RESAS_API_ENDPOINT as string;
  const get: (url: string) => Promise<T> = (url: string) =>
    fetch(`${RESAS_API_END_POINT}/${url}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        throw e;
      });

  return { get };
};
