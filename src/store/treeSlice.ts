import {createSlice, nanoid, type PayloadAction} from "@reduxjs/toolkit";
import type {Node} from "../types/nodeTree.ts";

interface TreeState {
    root: Node[];
}

const initialState: TreeState = {
    root: []
}

const findNode = (nodes: Node[], id: string): Node | null => {
    for (const node of nodes) {
        if (node.id === id) {
            return node;
        }
        const nodeInChildren = node.children && findNode(node.children, id);
        if (nodeInChildren) {
            return nodeInChildren;
        }
    }
    return null;
}

const removeNodeAndChildren = (nodes: Node[], id: string): boolean => {
    const numericalId = nodes.findIndex(n => n.id === id);
    if (numericalId !== -1) {
        nodes.splice(numericalId, 1);
        return true;
    }
    return nodes.some(n => n.children && removeNodeAndChildren(n.children, id));
}

export const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {
        addNode: (
            state,
            { payload }: PayloadAction<{ parentId: string | null; name: string }>
        ) => {
            const newNode: Node = { id: nanoid(), name: payload.name };
            if (payload.parentId === null) {
                state.root.push(newNode);
            }
            else {
                const parent = findNode(state.root, payload.parentId);
                if (parent) {
                    parent.children = parent.children ?? [];
                    parent.children.push(newNode);
                    console.log(parent.children);
                }
            }
        },

        renameNode: (state, { payload }: PayloadAction<{ id: string, name: string }>) => {
            const node = findNode(state.root, payload.id);
            if (node) {
                node.name = payload.name;
            }
        },

        removeNode: (state, { payload: id }: PayloadAction<string>) => {
            removeNodeAndChildren(state.root, id);
        },

        resetTree: (state) => {
            state.root.length = 0;
        }
    }
})

export const { addNode, renameNode, removeNode, resetTree } = treeSlice.actions;