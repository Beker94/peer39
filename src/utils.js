export const getSeasons = (episodes = []) => {
  const episodesSeasons = episodes.map((el) => Number(el.season));
  let result = [];

  for (let str of episodesSeasons) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
};

export function setupFetchStub(data) {
  return function fetchStub(_url) {
    return new Promise((resolve) => {
      resolve({
        ok: true,
        json: () => Promise.resolve(data),
      });
    });
  };
}
