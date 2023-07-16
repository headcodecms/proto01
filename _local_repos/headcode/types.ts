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

export type Section = {
  id?: string
  name: string
  slug?: string
  locale?: string
  meta: any
  tags: any[]
  data: any
  published_at?: number
}

export interface DBInterface {
  setup(): Promise<void>

  getRoles(filter?: string): Promise<any[]>
  setRole(id: string, role: string): Promise<void>

  getCollections(name: string, locale?: string): Promise<any[]>

  saveSection(section: Section): Promise<any>
  deleteSection(id: string): Promise<void>
  addSection(name: string, slug: string, locale?: string): Promise<any>
  getSection(name: string, slug?: string, locale?: string): Promise<any[]>
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

export type SectionFields = {
  [key: string]: SectionField
}

export type SectionBase = {
  name: string
  label: string
  fields: SectionFields
  blocks?: SectionBase[]
}

export type SectionBlock = SectionBase

export type SectionConfig = SectionBase & {
  theme?: string
  component: any
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
