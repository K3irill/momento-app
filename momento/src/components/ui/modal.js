import "./modal.scss";


export function parentModal(...className) {
  const modalBlock = document.createElement("div");
  modalBlock.classList.add("modal", 'modal_invisible', ...className);

  return modalBlock;
}

export function createBtn(svg, ...classNames ) {
  const modalBtn = document.createElement("button");
  modalBtn.classList.add("modal__btn", ...classNames);
  const modalBtnIcon = document.createElement("img");
  modalBtnIcon.src = svg;
  modalBtn.appendChild(modalBtnIcon);

  return modalBtn;
}
