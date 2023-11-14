import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick,
  onButtonClick,// optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose, setOpen } = useModal();

  const onClick = () => {
    setTimeout(() => {
      if (onModalClose) setOnModalClose(onModalClose);
      setModalContent(modalComponent);
      if (onButtonClick) onButtonClick();
      setOpen(true);
    }, 300);
  };

  return <button onClick={onClick}>{itemText}</button>;
}

export default OpenModalMenuItem;
