import { supabaseMiddleware } from './services/supabase/supabaseMiddleware'
import supabaseAuthCallback from './services/supabase/supabaseAuthCallback'

import ExecuteSetupPage from './admin/ExecuteSetupPage'

import AdminLayout from './admin/AdminLayout'
import DashboardLayout from './admin/DashboardLayout'
import DashboardPage from './admin/DashboardPage'

import UsersLayout from './admin/UsersLayout'
import UsersPage from './admin/UsersPage'

import GlobalsPage from './admin/GlobalsPage'
import GlobalsNamePage from './admin/GlobalsNamePage'
import CollectionsPage from './admin/CollectionsPage'
import CollectionsNamePage from './admin/CollectionsNamePage'
import CollectionsNameSlugPage from './admin/CollectionsNameSlugPage'

export {
  supabaseMiddleware,
  supabaseAuthCallback,
  ExecuteSetupPage,
  AdminLayout,
  DashboardLayout,
  DashboardPage,
  UsersLayout,
  UsersPage,
  GlobalsPage,
  GlobalsNamePage,
  CollectionsPage,
  CollectionsNamePage,
  CollectionsNameSlugPage,
}