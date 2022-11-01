export const useFetch = <T>() => {
  const RESAS_API_END_POINT = process.env
    .NEXT_PUBLIC_RESAS_API_ENDPOINT as string;
  const RESAS_API_KEY = process.env.NEXT_PUBLIC_RESAS_API_KEY as string;
  const get: (url: string) => Promise<T> = (url: string) =>
    fetch(`${RESAS_API_END_POINT}/${url}`, {
      method: 'GET',
      headers: { 'x-api-key': RESAS_API_KEY },
    }).then((res) => res.json());

  return { get };
};
