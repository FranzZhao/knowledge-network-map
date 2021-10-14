import { useState, useEffect } from "react";

export const useKeyPress = (targetKeyCode) => {
    const [keyPress, setKeyPress] = useState(false);

    const keyDownHandler = ({ keyCode }) => {
        if (keyCode === targetKeyCode) {
            setKeyPress(true);
        }
    }

    const keyUpHandler = ({ keyCode }) => {
        if (keyCode === targetKeyCode) {
            setKeyPress(false);
        }
    }

    // key board event listener
    useEffect(() => {
        //添加
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
        return () => {
            //卸载
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
        };
    });

    return keyPress;
};