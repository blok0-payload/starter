import type { TextField } from 'payload'

export const createIconSelectField = (name: string, label: string, required: boolean = false): TextField => {
    return {
        name,
        type: 'text',
        label,
        required,
        admin: {
            components: {
                Field: {
                    path: '@/fields/IconSelect/Component#IconSelectComponent',
                },
            },
        },
    }
}
