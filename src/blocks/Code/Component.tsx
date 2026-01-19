import React from 'react'

import { Code } from './Component.client'
import { CodeBlock as CodeBlockType } from '@/payload-types'

export type CodeBlockProps = {
  code: string
  language?: string
  blockType: 'code'
}

type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlock: React.FC<CodeBlockType & { className?: string }> = ({ code, language, className }) => {
  return (
    <div className={['not-prose', className].filter(Boolean).join(' ')}>
      <Code code={code} language={language as string} />
    </div>
  )
}
