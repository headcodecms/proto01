import config from '@/headcode.config'

export const ROLES = {
  new: 'new',
  editor: 'editor',
  admin: 'admin',
  rejected: 'rejected',
} as const

export const TABLES = {
  roles: 'roles',
  sections: 'sections',
} as const

export const table = (name: string) => config.version + '_' + name
export const cloneTable = (name: string) =>
  config.clone ? config.clone + '_' + name : ''
