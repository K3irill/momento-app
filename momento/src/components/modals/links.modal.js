import "./links.layout.scss";
import plusSVG from "../../assets/plusSVG.svg";
import { parentModal } from "../ui/modal";
import { createBtnMore } from "../ui/modal";

export function linksModal() {
  const modalBlock = parentModal(["modal__links"]);

  const modalCreate = document.createElement("button");
  modalCreate.classList.add("modal__btn", "modal__btn-plus", "modal__btn-def");
  const modalCreateIcon = document.createElement("img");
  modalCreateIcon.src = plusSVG;

  modalCreate.appendChild(modalCreateIcon);
  modalBlock.appendChild(modalCreate);
  const listLinks = document.createElement("ul");
  listLinks.classList.add("modal__list");

  listLinks.appendChild(createLink("Google", "https://www.google.com/"));

  modalBlock.appendChild(listLinks);
  return modalBlock;
}

function createLink(title, url) {
    
  const item = document.createElement("li");
  item.classList.add("modal__list_item");

  const link = document.createElement("a");
  link.classList.add("modal__list_link");
  link.textContent = title;
  link.href = url;

  item.appendChild(link);
  item.appendChild(createBtnMore(["modal__list_link-more"]));
  return item;
}

