import * as LucideIcons from 'lucide-react'
import { LucideProps } from 'lucide-react'
import React from 'react'

export const getIconComponent = (iconName?: string | null): React.FC<LucideProps> | null => {
    if (!iconName) return null

    // Lucide icons are exported as PascalCase (e.g., 'ArrowRight')
    // The picker should be saving the name correctly.
    const Icon = (LucideIcons as any)[iconName]

    return Icon || null
}
