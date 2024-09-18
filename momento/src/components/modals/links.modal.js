import "./links.layout.scss";
import plusSVG from "../../assets/plusSVG.svg";
import moreSVG from "../../assets/moreSVG.svg";
import backSVG from "../../assets/backSVG.svg";
import { parentModal } from "../ui/modal";
import { createBtn } from "../ui/modal";

export function linksModal() {
  const modalBlockWrapper = parentModal("modal__links-wrap");
  modalBlockWrapper.classList.add("modal__links-wrap");

  const modalBlock = document.createElement("div");
  modalBlock.classList.add("modal__links");

  const modalBtnMore = createBtn(moreSVG, "modal__btn-def");
  const modalBtnLinkCreate = createBtn(
    plusSVG,
    "modal__btn-plus",
    "modal__btn-def"
  );

  const createLinkMenu = document.createElement("div");
  createLinkMenu.classList.add("modal__create-link-menu");

  const linkMenuTitle = document.createElement("h2");
  linkMenuTitle.textContent = "Creating a link";

  createLinkMenu.append(linkMenuTitle);
  modalBlock.append(modalBtnMore);

  let isMenuOpen = false;

  modalBtnLinkCreate.addEventListener("click", () => {
    modalBlock.classList.toggle("modal__links--shift-left");
    createLinkMenu.classList.toggle("modal__create-link-menu--active");

    modalBlockWrapper.append(createLinkMenu);

    if (isMenuOpen) {
      modalBlockWrapper.style.height = '150px'
      modalBtnLinkCreate.querySelector("img").src = plusSVG;
      modalBtnLinkCreate.style.transform = "translateX(0)";
    } else {
            modalBlockWrapper.style.height = '300px'
      modalBtnLinkCreate.querySelector("img").src = backSVG;
      modalBtnLinkCreate.style.transform = "translateX(-280px)";
    }

    isMenuOpen = !isMenuOpen; 
  });

  modalBlockWrapper.append(modalBlock);
  modalBlockWrapper.append(modalBtnLinkCreate);

  const listLinks = document.createElement("ul");
  listLinks.classList.add("modal__list");

  listLinks.append(createLink("Google", "https://www.google.com/"));

  modalBlock.append(listLinks);
  return modalBlockWrapper;
}

function createLink(title, url) {
  const item = document.createElement("li");
  item.classList.add("modal__list_item");

  const link = document.createElement("a");
  link.classList.add("modal__list_link");
  link.textContent = title;
  link.href = url;

  item.append(link);
  item.append(createBtn(moreSVG, "modal__list_link-more"));
  return item;
}
