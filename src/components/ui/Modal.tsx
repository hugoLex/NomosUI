import React, { ReactNode } from "react";
import { ReactPortal, DetectOutsideClick } from "@app/hoc";

const Modal = ({
  children,
  show,
  toogleModal,
}: {
  children: ReactNode;
  show: boolean;
  toogleModal: Function;
}) => {
  return (
    <ReactPortal wrapperId={"qr-modal"}>
      <div
        role="dialog"
        className={`relative  ${show ? "visible z-[1000]" : "invisible z-0"}`}
      >
        <div
          className={`fixed inset-0 bg-gray-500 ${
            show
              ? "visible ease-out duration-300  opacity-100 delay-100"
              : "invisible ease-in duration-200 opacity-0"
          } bg-opacity-75 transition-opacity`}
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            data-toggle="true"
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <DetectOutsideClick onClickOutside={toogleModal}>
              <div
                className={` ${
                  show
                    ? "visible opacity-100 translate-y-0 sm:scale-100 transition-all ease-out duration-300 delay-150"
                    : "invisible opacity-0 translate-y-4 sm:translate-y-0 transition-all sm:scale-95 ease-in duration-200"
                }`}
              >
                {children}
              </div>
            </DetectOutsideClick>
          </div>
        </div>
      </div>
    </ReactPortal>
  );
};

export default Modal;
