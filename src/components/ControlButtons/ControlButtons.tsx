import './ControlButtons.css'
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {clearMode, setMode, type UiMode} from "../../store/uiSlice.ts";

export const ControlButtons = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(state => state.ui.mode);

    const handleSelect = (m: UiMode) => () => {
        if (m === mode) {
            dispatch(clearMode());
        }
        else {
            dispatch(setMode(m));
        }
    }

    return (
        <div id={'buttons'}>
            <button className={'chosen-button'} onClick={handleSelect('ADD')}>Add</button>
            <button onClick={handleSelect('REMOVE')}>Remove</button>
            <button onClick={handleSelect('EDIT')}>Edit</button>
            <button>Reset</button>
        </div>
    )
}