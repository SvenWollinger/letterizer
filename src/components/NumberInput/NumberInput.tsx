import React, { useEffect, useRef, useState } from "react";
import styles from "./NumberInput.module.css";

const CANCEL_EDITING_KEYS = [
    "Escape",
    "Enter"
];

type Props = {
    label?: string | null;
    value: number;
    onChange: (value: number) => void;
}

function NumberInput({ label = null, value, onChange }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const onMinus = () => onChange(--value);
    const onPlus = () => onChange(++value);

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(CANCEL_EDITING_KEYS.includes(e.key))
            setIsEditing(false);
    }

    useEffect(() => {
        if(isEditing && inputRef.current !== null) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);
    
    return (
        <div className={styles.input}>
            { label && <label>{label}</label> }
            <button onClick={onMinus} className={styles.button}>-</button>
            { isEditing ?
                <input
                    ref={inputRef}
                    type={"number"}
                    value={value}
                    onBlur={() => setIsEditing(false)}
                    onChange={(e) => onChange(e.target.valueAsNumber)}
                    onKeyDown={handleInputKeyDown}
                ></input> :
                <span onClick={() => setIsEditing(true)} className={styles.label}>{value}</span>
            }
            <button onClick={onPlus} className={styles.button}>+</button>
        </div>
    );
}

export { NumberInput };