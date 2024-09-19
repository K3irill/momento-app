import "./styles/global.scss";
import { renderHeader } from "./components/header/header";
import { renderTimePage } from "./components/main/time-page";
// import { linksModal } from "./components/modals/links.modal";

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("app");
  const header = await renderHeader();
  const timePage = renderTimePage()
  console.log(root);

  
  root.appendChild(header);
  root.append(timePage);
  // root.appendChild(modal);
});
