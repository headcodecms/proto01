import BlogHeroBase from './BlogHeroBase'

const BlogHero = ({ ...props }) => {
  return <BlogHeroBase {...props} />
  // return <BlogHeroBase classExcerpt="prose-xl prose-gray" {...props} />
}

export default BlogHero
