const fetchDataNoStore = async (url: string) => {
  let data: any;
  data = [];
  try {
    data = await fetch(url, { cache: "no-store" }).then((pr) =>
      pr != null ? pr.json() : []
    );
  } catch (e) {
    console.log(e);
  }
  return data;
};
export default fetchDataNoStore;
