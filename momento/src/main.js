import "./styles/global.scss";
import { addElementsToBlock, renderHeader } from "./components/header/header";
import { renderMain } from "./components/main/main-block";
import { createLoader } from "./components/ui/loader";

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("app");

  const loader = createLoader();
  root.append(loader);

  const main = await renderMain();
  root.append(main);

  const header = await renderHeader();
  root.prepend(header);

  root.removeChild(loader);
});
