import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {clearMode, setMode, type UiMode} from "../../store/uiSlice.ts";
import './ControlButton.css'

const label: Record<UiMode, string> = {
    ADD: 'Add',
    REMOVE: 'Remove',
    EDIT: 'Edit',
    NONE: 'None',
}

interface Props {
    mode: UiMode;
}

export const ModeButton = ({mode}: Props) => {
    const dispatch = useAppDispatch();
    const activeMode = useAppSelector(state => state.ui.mode);
    const selectedNodeId = useAppSelector(state => state.ui.selectedNodeId);

    const handleSelect = (m: UiMode) => () => {
        if (m === activeMode) {
            dispatch(clearMode());
        }
        else {
            dispatch(setMode(m));
        }
    }

    return (
        <button
            className={activeMode === mode ? 'chosen-button' : ''}
            onClick={handleSelect(mode)}
            disabled={!!selectedNodeId}
        >
            {label[mode]}
        </button>
    )
}