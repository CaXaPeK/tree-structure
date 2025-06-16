import './App.css'
import type {Node} from "./types/nodeTree.ts";
import {ModeButton} from "./components/ControlButton/ModeButton.tsx";
import {NodeContainer} from "./components/NodeContainer/NodeContainer.tsx";
import {nanoid} from "@reduxjs/toolkit";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "./hooks.ts";
import {selectNode} from "./store/uiSlice.ts";
import {NameInput} from "./components/NameInput/NameInput.tsx";

function App() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const activeMode = useAppSelector(state => state.ui.mode);
    const selectedNodeId = useAppSelector(state => state.ui.selectedNodeId);
    const dispatch = useAppDispatch();

    const handleEditNode = (childId: string, newName: string) =>
        setNodes(prev =>
            prev.map(n =>
                n.id === childId ? {...n, name: newName} : n
            )
        );

    const handleRemoveNode = (childId: string) =>
        setNodes(prev => prev.filter(n => n.id !== childId));

    return (
        <div id={'application'}>
            <div id={'controlButtons'}>
                <ModeButton mode={'ADD'}/>
                <ModeButton mode={'EDIT'}/>
                <ModeButton mode={'REMOVE'}/>
                {/*<ControlButton mode={'none'}/>*/}
                <button
                    onClick={() => setNodes([])}
                    disabled={!!selectedNodeId}
                >Reset</button>
            </div>

            <div>
                {nodes.map((node, index) => (
                    <NodeContainer
                        id={node.id}
                        name={node.name}
                        onEdit={handleEditNode}
                        onRemove={handleRemoveNode}
                        key={index}
                    />
                ))}
                {activeMode === 'ADD' && !selectedNodeId &&
                    <span id={'addToRootNode'} onClick={!selectedNodeId
                        ? () => dispatch(selectNode('root'))
                        : undefined
                    }>
                        [Add to Root Node]
                    </span>
                }
                {selectedNodeId === 'root' && activeMode === 'ADD' &&
                    <NameInput
                        initialValue={''}
                        onAccept={(newName: string) =>
                            setNodes((prev)=>
                                [...prev, {id: nanoid(), name: newName}])}
                    />
                }
            </div>
        </div>
    )
}

export default App
