import "./modal.scss";
import moreSVG from "../../assets/moreSVG.svg";

export function parentModal(...className) {
  const modalBlock = document.createElement("div");
  modalBlock.classList.add("modal", 'modal_invisible', ...className);

  modalBlock.appendChild(createBtnMore('modal__btn-def'));
  return modalBlock;
}

export function createBtnMore(...classNames) {
  const modalMore = document.createElement("button");
  modalMore.classList.add("modal__btn", ...classNames);
  const modalMoreIcon = document.createElement("img");
  modalMoreIcon.src = moreSVG;
  modalMore.appendChild(modalMoreIcon);

  return modalMore;
}

function toggleModule(){
  
}