function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();    //reader - nuskaito faila ir is kart pavercia i stringa
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default getBase64; 