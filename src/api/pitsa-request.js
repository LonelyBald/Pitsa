export function fetchPizzasList() {
  return fetch('https://629de05cc6ef9335c0a8e475.mockapi.io/api/pitsa/items').then((res) => {
    return res.json();
  });
}
