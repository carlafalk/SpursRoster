import "./style.css";

async function fetchData() {
  const result = await fetch("/");
  const data = await result.json();
  console.log(data);
}

fetchData();
