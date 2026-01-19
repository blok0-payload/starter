'use client'
import React, { useState, useMemo, useRef, useEffect } from 'react'
import * as LucideIcons from 'lucide-react'
import { useField, FieldLabel, TextInput, Button } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'

export const IconSelectComponent: React.FC<TextFieldClientProps> = ({ field, path }) => {
    const { value, setValue } = useField<string>({ path: path || field.name })
    const [searchTerm, setSearchTerm] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const iconNames = useMemo(() => {
        return Object.keys(LucideIcons).filter(
            (key) => typeof (LucideIcons as any)[key] === 'function' || typeof (LucideIcons as any)[key] === 'object'
        )
    }, [])

    const filteredIcons = useMemo(() => {
        if (!searchTerm) return iconNames.slice(0, 100)
        return iconNames
            .filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice(0, 100)
    }, [searchTerm, iconNames])

    const SelectedIcon = value && (LucideIcons as any)[value] ? (LucideIcons as any)[value] : null

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="field-type text" ref={containerRef} style={{ position: 'relative' }}>
            <div style={{ marginBottom: '10px' }}>
                <FieldLabel htmlFor={`field-${path}`} label={field.label} />
                <div style={{ display: 'flex', alignItems: 'stretch', gap: '8px', marginTop: '5px' }}>
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            width: '40px',
                            height: '40px',
                            border: '1px solid var(--theme-elevation-150)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'var(--theme-elevation-50)',
                            flexShrink: 0,
                            cursor: 'pointer',
                            transition: 'border-color 0.2s',
                        }}
                    >
                        {SelectedIcon ? <SelectedIcon size={20} /> : <div style={{ fontSize: '10px', color: 'var(--theme-elevation-400)' }}>None</div>}
                    </div>

                    <div style={{ flexGrow: 1, display: 'flex', gap: '8px' }}>
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            style={{ flexGrow: 1, cursor: 'pointer' }}
                        >
                            <TextInput
                                readOnly
                                value={value || ''}
                                onChange={() => { }}
                                path={path || field.name}
                                style={{ pointerEvents: 'none', margin: 0 }}
                                placeholder="Select an icon..."
                            />
                        </div>
                        {value && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button
                                    className="btn btn--style-secondary btn--size-small"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setValue('')
                                    }}
                                    style={{
                                        margin: 0,
                                        padding: '0 8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '40px',
                                        width: '40px',
                                        cursor: 'pointer'
                                    }}
                                    type="button"
                                >
                                    <LucideIcons.X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        border: '1px solid var(--theme-elevation-150)',
                        borderRadius: '4px',
                        padding: '12px',
                        background: 'var(--theme-elevation-0)',
                        zIndex: 1000,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '320px',
                    }}
                >
                    <div style={{ marginBottom: '12px' }}>
                        <TextInput
                            placeholder="Search icons..."
                            value={searchTerm}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                            path="icon-search"
                        />
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
                            gap: '8px',
                            maxHeight: '220px',
                            overflowY: 'auto',
                            padding: '4px',
                        }}
                    >
                        {filteredIcons.map((name) => {
                            const Icon = (LucideIcons as any)[name]
                            const isSelected = value === name
                            return (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => {
                                        setValue(name)
                                        setIsOpen(false)
                                    }}
                                    title={name}
                                    style={{
                                        padding: '8px',
                                        border: isSelected ? '1px solid var(--theme-success-500)' : '1px solid var(--theme-elevation-100)',
                                        borderRadius: '4px',
                                        background: isSelected ? 'var(--theme-success-50)' : 'transparent',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.1s',
                                    }}
                                >
                                    <Icon size={18} color={isSelected ? 'var(--theme-success-700)' : 'var(--theme-elevation-800)'} />
                                </button>
                            )
                        })}
                    </div>

                    {filteredIcons.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '10px', color: 'var(--theme-elevation-400)', fontSize: '12px' }}>
                            No icons found
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
