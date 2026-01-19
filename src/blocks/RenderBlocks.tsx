import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { MediaBlock } from './MediaBlock/Component'
import { CodeBlock } from './Code/Component'



export type PageBlocksName = Page['layout'][number]['blockType']
export type PageBlocks = Page['layout'][number]
export type BlockByType<T extends PageBlocksName> =
  Extract<PageBlocks, { blockType: T }>


const blockComponents: { [K in PageBlocksName]: React.FC<BlockByType<K>> } = {
  mediaBlock: MediaBlock,
  code: CodeBlock,

}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
