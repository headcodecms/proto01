import AuthMiddlewareService from './services/AuthMiddlewareService'
import AuthCallbackService from './services/AuthCallbackService'
import DBService from './services/DBService'

import ExecuteSetupPage from './admin/ExecuteSetupPage'

import AdminLayout from './admin/AdminLayout'
import DashboardLayout from './admin/DashboardLayout'
import DashboardPage from './admin/DashboardPage'

import MediaLayout from './admin/MediaLayout'

import UsersLayout from './admin/UsersLayout'
import UsersPage from './admin/UsersPage'

import GlobalsPage from './admin/GlobalsPage'
import GlobalsNamePage from './admin/GlobalsNamePage'
import CollectionsPage from './admin/CollectionsPage'
import CollectionsNamePage from './admin/CollectionsNamePage'
import CollectionsNameSlugPage from './admin/CollectionsNameSlugPage'

import Section from './render/Section'
import { getMetadata } from './utils/render'
import { findSectionData } from './utils/data'

export {
  AuthMiddlewareService,
  AuthCallbackService,
  DBService,
  ExecuteSetupPage,
  AdminLayout,
  DashboardLayout,
  DashboardPage,
  MediaLayout,
  UsersLayout,
  UsersPage,
  GlobalsPage,
  GlobalsNamePage,
  CollectionsPage,
  CollectionsNamePage,
  CollectionsNameSlugPage,
  Section,
  getMetadata,
  findSectionData,
}
