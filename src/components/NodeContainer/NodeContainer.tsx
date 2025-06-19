import type {Node} from "../../types/nodeTree.ts";
import './NodeContainer.css'
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {NameInput} from "../NameInput/NameInput.tsx";
import {selectNode} from "../../store/uiSlice.ts";
import {addNode, removeNode, renameNode} from "../../store/treeSlice.ts";

export const NodeContainer = (node: Node) => {
    const activeMode = useAppSelector(state => state.ui.mode);
    const selectedNodeId = useAppSelector(state => state.ui.selectedNodeId);
    const dispatch = useAppDispatch();

    return (
        <div>
            {selectedNodeId === node.id && activeMode === 'EDIT' ?
                <NameInput
                    initialValue={node.name}
                    onAccept={(newName: string) =>
                        dispatch(renameNode({id: node.id, name: newName}))
                    }
                />
                :
                <span
                    className={activeMode !== 'NONE' && !selectedNodeId ? 'selectable' : ''}
                    onClick={
                        !selectedNodeId
                            ? activeMode === 'REMOVE'
                                ? () => dispatch(removeNode(node.id))
                                : activeMode !== 'NONE'
                                    ? () => dispatch(selectNode(node.id))
                                    : undefined
                            : undefined
                    }
                >
                {node.name}
            </span>
            }

            <div className={'node-children'}>
                {node.children?.map((child) => (
                    <NodeContainer
                        id={child.id}
                        name={child.name}
                        children={child.children}
                        key={child.id}
                    />
                ))}
                {selectedNodeId === node.id && activeMode === 'ADD' &&
                    <NameInput
                        initialValue={''}
                        onAccept={(newName: string) =>
                            dispatch(addNode({parentId: node.id, name: newName}))
                        }
                    />
                }
            </div>
        </div>
    )
}