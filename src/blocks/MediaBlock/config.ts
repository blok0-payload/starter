import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Full', value: 'full' },
        { label: 'Video', value: 'video' },
      ]
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
