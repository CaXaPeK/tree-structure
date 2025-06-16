import type {Node} from "../../types/nodeTree.ts";
import './NodeContainer.css'
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {NameInput} from "../NameInput/NameInput.tsx";
import {selectNode} from "../../store/uiSlice.ts";
import {nanoid} from "@reduxjs/toolkit";

interface Props extends Node {
    onEdit: (id: string, newName: string) => void;
    onRemove: (id: string) => void;
}

export const NodeContainer = ({id, name, onEdit, onRemove}: Props) => {
    const activeMode = useAppSelector(state => state.ui.mode);
    const selectedNodeId = useAppSelector(state => state.ui.selectedNodeId);
    const dispatch = useAppDispatch();

    const handleEditChild = (childId: string, newName: string) =>
        setChildNodes(prev =>
            prev.map(n =>
                n.id === childId ? {...n, name: newName} : n
            )
        );

    const handleRemoveChild = (childId: string) =>
        setChildNodes(prev => prev.filter(n => n.id !== childId));

    const [childNodes, setChildNodes] = useState<Node[]>([]);

    return (
        <div>
            {selectedNodeId === id && activeMode === 'EDIT' ?
                <NameInput
                    initialValue={name}
                    onAccept={(newName: string) => onEdit?.(id, newName)}
                />
                :
                <span
                    className={activeMode !== 'NONE' && !selectedNodeId ? 'selectable' : ''}
                    onClick={
                        !selectedNodeId
                            ? activeMode === 'REMOVE'
                                ? () => onRemove(id)
                                : activeMode !== 'NONE'
                                    ? () => dispatch(selectNode(id))
                                    : undefined
                            : undefined
                    }
                >
                {name}
            </span>
            }

            <div className={'node-children'}>
                {childNodes?.map((node) => (
                    <NodeContainer
                        id={node.id}
                        name={node.name}
                        onEdit={handleEditChild}
                        onRemove={handleRemoveChild}
                        key={id}
                    />
                ))}
                {selectedNodeId === id && activeMode === 'ADD' &&
                    <NameInput
                        initialValue={''}
                        onAccept={(newName: string) =>
                            setChildNodes((prev)=>
                                [...prev, {id: nanoid(), name: newName}])}
                    />
                }
            </div>
        </div>
    )
}