const getData = async (url) => {
  try {
    const rawData = await fetch(url);
    const jsonData = await rawData.json();

    return jsonData;
  } catch (error) {
    console.log(error);
  }
}

export default getData;