export const useFetch = <T>() => {
  const RESAS_API_END_POINT =
    'https://ul0109hpre.execute-api.ap-northeast-1.amazonaws.com';
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
