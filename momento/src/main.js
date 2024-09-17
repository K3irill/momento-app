import "./styles/global.scss";
import { renderHeader } from "./components/header/header";


document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("app");
  const header = await renderHeader();

  
  root.appendChild(header);
});
