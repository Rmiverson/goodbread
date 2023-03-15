import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateNodesFromDOM } from '@lexical/html'
import { $getRoot, $getSelection, $insertNodes, RootNode } from 'lexical'
import { useEffect } from 'react'

export default function SetDataPlugin ({model}) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!model) return;

    return editor.update(() => {
      const parser = new DOMParser()
      const dom = parser.parseFromString(model, "text/html")

      const nodes = $generateNodesFromDOM(editor, dom)
    
      const root = $getRoot()

      nodes.forEach((node) => root.append(node))
    })
    // doing this for now until I can find a better solution
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);
}