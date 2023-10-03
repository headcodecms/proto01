import { MetadataRoute } from 'next'

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: 'http://localhost:3000',
    },
  ]

  /*
  // Generate site map from global sections and collections
  // Use headcodeSitemap also in Link Editor and TipTap Editor
  return headcodeSitemap('http://localhost:3000')
    .add('/', 'Homepage', { changeFrequency: 'weekly', priority: 1 })
    .addGlobal('/about', 'about')
    .add('/login', 'Login Page')
    .addCollection('/blog', 'blog', { priority: 0.8 })
    .toSitemap()
  ]
  */
}

export default sitemap
