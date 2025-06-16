import './NameInput.css'
import {useAppDispatch} from "../../hooks.ts";
import {deselectNode} from "../../store/uiSlice.ts";
import {useState} from "react";

interface Props {
    initialValue: string;
    onAccept: (name: string) => void;
}

export const NameInput = ({onAccept, initialValue}: Props) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(initialValue);

    const handleAccept = () => {
        const trimmed = value.trim();
        if (!trimmed) return;
        onAccept(trimmed);
        dispatch(deselectNode());
    }

    const handleCancel
        = () => dispatch(deselectNode());

    return (
        <span className={'name-input'}>
            <input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') handleAccept();
                    if (e.key === 'Escape') handleCancel();
                }}
                placeholder={'New node name'}
            />
            <button onClick={handleAccept} className={'accept-button'}>✓</button>
            <button onClick={handleCancel} className={'cancel-button'}>✗</button>
        </span>
    )
}