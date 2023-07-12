import { StaticImageData } from 'next/image'
import { NextRequest, NextResponse } from 'next/server'

export type SupabaseConfig = {
  url: string
  anon: string
  connectionString?: string
  revalidate?: number | boolean
  rowLevelSecurity?: boolean
  storage?: {
    bucket: string
    version: string
  }
}

export interface DBInterface {
  setup(): Promise<void>
  getRoles(filter?: string): Promise<any[]>
  setRole(id: string, role: string): Promise<void>
}

export interface StorageInterface {
  upload(): void
}

type User = {
  id: string,
  email: string | undefined
}

export interface AuthInterface {
  signIn(email: string, password: string): Promise<string | null>
  signUp(email: string, password: string): Promise<string | null>
  signOut() : Promise<void>
  getUser(): Promise<User | null>
}

export interface AuthCallbackInterface {
  authCallback(request: Request): Promise<NextResponse>
}

export type HeadcodeConfig = {
  version: string
  clone?: string | boolean
  services: {
    supabase: SupabaseConfig
  }
  globals?: SectionTypeConfig[]
  collections?: SectionTypeConfig[]
}

export type SectionTypeConfig = {
  name: string
  locales?: string[]
  metadata?: boolean
  sections?: SectionConfig | SectionConfig[] | boolean
  presets?: SectionConfig[] | boolean
  limit?: number
  renderer?: any
}

type SectionFieldOption = {
  label: string
  value: string
}

type SectionField = {
  label: string
  type: FieldType<FieldValue>
  defaultValue?: string
  options?: SectionFieldOption[]
}

type SectionBlock = {
  name: string
  label: string
  fields: {
    [key: string]: SectionField
  }
  blocks?: SectionBlock[]
}

export type SectionConfig = {
  name: string
  label: string
  theme?: string
  component: any
  fields: {
    [key: string]: SectionField
  }
  blocks?: SectionBlock[]
}

// Fields
export type ImageData = {
  name: string | null
  url: string | null
  alt: string
  width: number
  height: number
  size: number
  format: string | null
}
export type TextValue = string
export type RichTextValue = string
export type ImageValue = ImageData | StaticImageData
export type CheckboxValue = boolean
export type SelectValue = string
export type FieldValue =
  | TextValue
  | RichTextValue
  | ImageValue
  | CheckboxValue
  | SelectValue
export type FieldType<FieldValue> = {
  render: any
  defaultValue: FieldValue
}

export type FieldInput<TValue extends FieldValue> = {
  label: string
  value: TValue
  defaultValue?: string
  options?: Array<{
    label: string
    value: string
  }>
  setValue: (value: TValue) => void
}
