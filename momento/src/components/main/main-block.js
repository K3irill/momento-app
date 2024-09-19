import { addElementsToBlock } from "../header/header";
import { renderTimePage } from "./time-page/time-page";

export async function renderMain() {
  const mainBlock = document.createElement("main");
  const wrapperContainer = document.createElement("div");
  wrapperContainer.classList.add("wrapper");

  const timePage = await renderTimePage();

  addElementsToBlock(wrapperContainer, [timePage]);
  addElementsToBlock(mainBlock, [wrapperContainer]);

  return mainBlock;
}
