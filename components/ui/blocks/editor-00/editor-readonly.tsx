"use client";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { SerializedEditorState } from "lexical";

import { editorTheme } from "@/components/ui/editor/themes/editor-theme";

import { nodes } from "./nodes";

const editorConfig: InitialConfigType = {
  namespace: "EditorReadonly",
  theme: editorTheme,
  nodes,
  editable: false,
  onError: (error: Error) => {
    console.error(error);
  },
};

export function EditorReadonly({
  editorSerializedState,
  className,
}: {
  editorSerializedState?: SerializedEditorState | null;
  className?: string;
}) {
  // Check if editorSerializedState is null, undefined, or doesn't have the required structure
  if (!editorSerializedState || !editorSerializedState.root) {
    return null;
  }

  // Additional check to ensure it's a valid editor state
  try {
    const stateString = JSON.stringify(editorSerializedState);

    return (
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editorState: stateString,
        }}
      >
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={
                className ??
                "outline-none prose prose-sm max-w-none dark:prose-invert"
              }
              aria-readonly={true}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
      </LexicalComposer>
    );
  } catch (error) {
    console.error("Error rendering editor state:", error);
    return null;
  }
}
