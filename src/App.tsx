import './App.css'
import {ModeButton} from "./components/ModeButton/ModeButton.tsx";
import {NodeContainer} from "./components/NodeContainer/NodeContainer.tsx";
import {useAppDispatch, useAppSelector} from "./hooks.ts";
import {selectNode} from "./store/uiSlice.ts";
import {NameInput} from "./components/NameInput/NameInput.tsx";
import {addNode, resetTree} from "./store/treeSlice.ts";

function App() {
    const activeMode = useAppSelector(state => state.ui.mode);
    const selectedNodeId = useAppSelector(state => state.ui.selectedNodeId);
    const rootChildren = useAppSelector(state => state.tree.root);
    const dispatch = useAppDispatch();

    return (
        <div id={'application'}>
            <div id={'controlButtons'}>
                <ModeButton mode={'ADD'}/>
                <ModeButton mode={'EDIT'}/>
                <ModeButton mode={'REMOVE'}/>
                <button
                    onClick={() => dispatch(resetTree())}
                    disabled={!!selectedNodeId}
                >Reset</button>
            </div>

            <div>
                {rootChildren.map((node) => (
                    <NodeContainer
                        id={node.id}
                        name={node.name}
                        children={node.children}
                        key={node.id}
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
                        onAccept={(newName) =>
                            dispatch(addNode({parentId: null, name: newName}))
                        }
                    />
                }
            </div>
        </div>
    )
}

export default App
