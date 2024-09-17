import "./styles/global.scss";
import { renderHeader } from "./components/header/header";
import { getLocationData } from "./components/header/getLocation";

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("app");

  const header = await renderHeader();
  root.appendChild(header);
  await getLocationData();
});
