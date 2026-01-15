"use client";

import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $createParagraphNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
} from "lexical";
import { $createHeadingNode, HeadingTagType } from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bold,
  Italic,
  Underline,
  Undo,
  Redo,
  List,
  ListOrdered,
} from "lucide-react";

const blockTypeToBlockName = {
  paragraph: "Normal",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  bullet: "Bullet List",
  number: "Numbered List",
};

export function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      // Update block type
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        const type = element.getType();
        if (type === "heading") {
          const tag = (element as any).getTag();
          setBlockType(tag);
        } else if ($isListNode(element)) {
          const parentList = element as ListNode;
          const listType = parentList.getListType();
          setBlockType(listType === "bullet" ? "bullet" : "number");
        } else {
          setBlockType("paragraph");
        }
      }
    }
  }, [editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload) => {
        setCanUndo(payload);
        return false;
      },
      1
    );
  }, [editor]);

  useEffect(() => {
    return editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload) => {
        setCanRedo(payload);
        return false;
      },
      1
    );
  }, [editor]);

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const handleBlockTypeChange = (value: string) => {
    if (value === "paragraph") {
      formatParagraph();
    } else if (value.startsWith("h")) {
      formatHeading(value as HeadingTagType);
    }
  };

  return (
    <div className="flex items-center gap-1 p-2 border-b border-border flex-wrap">
      {/* Undo/Redo */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        disabled={!canUndo}
        className="h-8 w-8 p-0"
        aria-label="Undo"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        disabled={!canRedo}
        className="h-8 w-8 p-0"
        aria-label="Redo"
      >
        <Redo className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Block Type */}
      <Select value={blockType} onValueChange={handleBlockTypeChange}>
        <SelectTrigger className="h-8 w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Normal</SelectItem>
          <SelectItem value="h1">Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="h3">Heading 3</SelectItem>
        </SelectContent>
      </Select>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Text Formatting */}
      <Button
        type="button"
        variant={isBold ? "secondary" : "ghost"}
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className="h-8 w-8 p-0"
        aria-label="Format Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={isItalic ? "secondary" : "ghost"}
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className="h-8 w-8 p-0"
        aria-label="Format Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={isUnderline ? "secondary" : "ghost"}
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className="h-8 w-8 p-0"
        aria-label="Format Underline"
      >
        <Underline className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Lists */}
      <Button
        type="button"
        variant={blockType === "bullet" ? "secondary" : "ghost"}
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          formatBulletList();
        }}
        className="h-8 w-8 p-0"
        aria-label="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={blockType === "number" ? "secondary" : "ghost"}
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          formatNumberedList();
        }}
        className="h-8 w-8 p-0"
        aria-label="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
}
