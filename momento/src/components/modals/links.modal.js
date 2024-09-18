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
  //-------------------------------------------------------------------
  // menu for creating links
  const createLinkMenu = document.createElement("div");
  createLinkMenu.classList.add("modal__create-link-menu");

  const linkMenuTitle = document.createElement("h2");
  linkMenuTitle.classList.add("modal__create-link-title");
  linkMenuTitle.textContent = "Creating a link";

  //creating form
  const baseForm = document.createElement("div");
  baseForm.classList.add("modal__base-form");

  //first input
  const nameLinkLabelForm = document.createElement("label");
  nameLinkLabelForm.classList.add("modal__label-name-link");
  nameLinkLabelForm.textContent = "Title";

  const nameLinkInputForm = document.createElement("input");
  nameLinkInputForm.classList.add("modal__input-name-link");

  //second input
  const urlLinkLabelForm = document.createElement("label");
  urlLinkLabelForm.classList.add("modal__label-name-link");
  urlLinkLabelForm.textContent = "Link";

  const urlLinkInputForm = document.createElement("input");
  urlLinkInputForm.classList.add("modal__input-name-link");

  //button
  const baseFormBtn = document.createElement("button");
  baseFormBtn.classList.add("modal__form-btn");
  baseFormBtn.textContent = "Add";
  //___________________________________________________//

  createLinkMenu.append(linkMenuTitle);
  //pushing form elements in base-form
  baseForm.append(nameLinkLabelForm);
  baseForm.append(nameLinkInputForm);
  baseForm.append(urlLinkLabelForm);
  baseForm.append(urlLinkInputForm);
  baseForm.append(baseFormBtn);
  //----------------

  createLinkMenu.append(baseForm);
  modalBlock.append(modalBtnMore);
  //-----------------------------------------------------------------------
  //listener for pressing on  modalBtnLinkCreate
  let isMenuOpen = false;
  function openLinkMenu() {
    modalBlock.classList.toggle("modal__links--shift-left");
    createLinkMenu.classList.toggle("modal__create-link-menu--active");

    modalBlockWrapper.append(createLinkMenu);

    if (isMenuOpen) {
      modalBlockWrapper.style.height = "150px";
      modalBtnLinkCreate.querySelector("img").src = plusSVG;
      modalBtnLinkCreate.style.transform = "translateX(0)";
    } else {
      modalBlockWrapper.style.height = "300px";
      modalBtnLinkCreate.querySelector("img").src = backSVG;
      modalBtnLinkCreate.style.transform = "translateX(-280px)";
    }

    isMenuOpen = !isMenuOpen;
  }
  modalBtnLinkCreate.addEventListener("click", () => {
    openLinkMenu()
  });

  //--------------------------------------

  modalBlockWrapper.append(modalBlock);
  modalBlockWrapper.append(modalBtnLinkCreate);

  const listLinks = document.createElement("ul");
  listLinks.classList.add("modal__list");
  listLinks.append(createLink("Google", "https://www.google.com/"));

  modalBlock.append(listLinks);

  //a little bit validation
  baseFormBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = nameLinkInputForm.value.trim();
    const url = urlLinkInputForm.value.trim();

    if (title === "") {
      alert("Please enter a title for the link.");
      return;
    }

    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      alert("Please enter a valid URL.");
      return;
    }

    listLinks.append(createLink(title, url));

    nameLinkInputForm.value = "";
    urlLinkInputForm.value = "";
    openLinkMenu()
  });

 

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
