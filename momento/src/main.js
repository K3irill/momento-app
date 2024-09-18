import "./styles/global.scss";
import { renderHeader } from "./components/header/header";
// import { linksModal } from "./components/modals/links.modal";

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("app");
  const header = await renderHeader();
  // const modal = linksModal()

  root.appendChild(header);
  // root.appendChild(modal);
});
