import React from "react"
import { Link, graphql } from "gatsby"
import BlogPostCard from '@hodrobond/ui-blogpostcard';

import Bio from "@hodrobond/ui-developercard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

import Sidebar from '../components/sidebar';

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <Sidebar />
      {posts.map(({ node }) => (
        <BlogPostCard
          title={{
            text: node.frontmatter.title || node.fields.slug,
            link: node.fields.slug,
          }}
          date={node.frontmatter.date}
          description={node.frontmatter.description || node.excerpt}
        />
    ))}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
