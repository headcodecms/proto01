import { StaticImageData } from 'next/image'
import { NextRequest, NextResponse } from 'next/server'
import { UseFormReturn } from 'react-hook-form'

// Types for headcode.config.ts

export type HeadcodeConfig = {
  version: string
  clone?: string | boolean
  globals?: SectionTypeConfig[]
  collections?: SectionTypeConfig[]
}

export type SectionTypeConfig = {
  name: string
  locales?: string[]
  metadata?: boolean
  sections?: SectionConfig | SectionConfig[] | boolean
  limit?: number
  presets?: SectionConfig | SectionConfig[] | boolean
}

export type ServicesConfig = {
  supabase?: SupabaseConfig
  auth: string
  db: string
  storage: string
}

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

type SectionFieldOption = {
  label: string
  value: string
}

type SectionField = {
  label: string
  type: FieldType<FieldValue, FieldComponent>
  defaultValue?: string
  options?: SectionFieldOption[]
}

export type SectionFields = {
  [key: string]: SectionField
}

export type SectionBase = {
  name: string
  label: string
  fields: SectionFields | null
  blocks?: SectionBase[] | null
}

export type SectionBlock = SectionBase

export type SectionConfig = SectionBase & {
  theme?: string
  component: any
}

// Types for service interfaces

export type CollectionOptions = {
  locale?: string
  range?: {
    from: number
    to: number
  }
  tags?: string | string[]
}

export interface DBInterface {
  setup(): Promise<void>

  getRoles(filter?: string): Promise<any[]>
  setRole(id: string, role: string): Promise<void>

  getCollections(name: string, locale?: string): Promise<any[]>
  findCollections(name: string, options?: CollectionOptions): Promise<any[]>

  saveSection(section: Section): Promise<any>
  deleteSection(id: string): Promise<void>
  addSection(name: string, slug: string, locale?: string | null): Promise<any>
  getSection(
    name: string,
    slug?: string | null,
    locale?: string | null
  ): Promise<any[]>
}

export interface StorageInterface {
  upload(file: File, name: string, format: string): Promise<string | null>
  getPublicUrl(path: string): string
  list(limit?: number, offset?: number): Promise<ImageData[]>
}

export type User = {
  id: string
  email: string | undefined
}

export interface AuthInterface {
  signIn(email: string, password: string): Promise<string | null>
  signUp(email: string, password: string): Promise<string | null>
  signOut(): Promise<void>
  getUser(): Promise<User | null>
}

export interface AuthCallbackInterface {
  authCallback(request: Request): Promise<NextResponse>
}

export interface AuthMiddleware {
  middleware({
    req,
    res,
  }: {
    req: NextRequest
    res: NextResponse
  }): Promise<string | null>
}

// Types for data from DB

export type Section = {
  id?: string
  name: string
  slug?: string
  locale?: string
  meta: MetaData | null
  tags: string[]
  data: Data[] | null
  published_at?: number
  created_at?: number
}

export type FieldsData = {
  [key: string]: any
}

export type BlockData = Data

export type Data = {
  id: string
  name: string
  label: string
  fields: FieldsData
  blocks?: Data[] | null
}

export type MetaData = {
  title?: string
  description?: string
}

// Types for editor fields

export type ImageData = {
  name: string | null
  url: string | StaticImageData | null
  alt: string
  width: number
  height: number
  size: number
  format: string | null
}
export type TextValue = string
export type RichTextValue = string
export type ImageValue = ImageData
export type CheckboxValue = boolean
export type SelectValue = string
export type LinkValue = {
  url: string
  title: string
  newWindow: boolean
}
export type FieldValue =
  | TextValue
  | RichTextValue
  | ImageValue
  | CheckboxValue
  | SelectValue
  | LinkValue

export type FieldComponent = {
  form: UseFormReturn<any, any, undefined>
  label: string
  name: string
}
export type SelectFieldComponent = FieldComponent & {
  options: { label: string; value: string }[]
  defaultValue?: string
}
export type FieldType<FieldValue, TRender extends FieldComponent> = {
  render(props: TRender): JSX.Element
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

export type SortableListItem = {
  id: string
  name: string
  label: string
  chosen?: boolean
  selected?: boolean
}

export type SortableListMenuItem = {
  name: string
  label: string
}

// Rendering types

export type RenderSection = {
  name: string
  slug?: string | null
  locale?: string | null
  localeFallback?: boolean
  renderer?: any
}

export type VisualEditingData = {
  id: string | null
  name: string
  slug?: string | null
  locale?: string | null
  section: {
    id: string
    name: string
    label: string
  }
}

export type VisualEditingInfo = {
  origin: string
  data: VisualEditingData
}

// Other types

type NavItem = {
  id: string
  label: string
}

export type EditorNav = {
  hasSections: boolean
  meta: boolean
  section: NavItem | null
  blocks: NavItem[]
}

export type AuthUser = {
  email: string
  password: string
}
