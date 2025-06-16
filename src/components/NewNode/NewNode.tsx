import './NewNode.css'
import {useAppSelector} from "../../hooks.ts";

export const NewNode = () => {
    const activeMode = useAppSelector(state => state.ui.mode);

    return (
        <div className={activeMode === 'ADD' ? 'new-node' : 'new-node-disabled'}>
            New Node
        </div>
    )
}