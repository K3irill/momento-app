import "./styles/global.scss";
import { addElementsToBlock, renderHeader } from "./components/header/header";
import { renderMain } from "./components/main/main-block";

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("app");
  const header = await renderHeader();
  const main = await renderMain();

  addElementsToBlock(root, [header, main]);
});
