import React from "react";

const MyModal = ({ isOpen, onClose, children, goods }) => {
    if (!isOpen) return null;

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                onClick={stopPropagation}
                style={{
                    background: "white",
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                    position: "relative",
                    zIndex: 2
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default MyModal;
