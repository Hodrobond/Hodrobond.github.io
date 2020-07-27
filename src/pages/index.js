import React, { useState, useMemo } from "react"
import { Link, graphql } from "gatsby"
import BlogPostCard from '@hodrobond/ui-blogpostcard';
import Bio from "@hodrobond/ui-developercard"
import Themes from '@hodrobond/ui-themes';
import ThemeWrapper from '@hodrobond/ui-themewrapper';
import ThemePicker from '@hodrobond/ui-themepicker';

import Sidebar from '../components/sidebar';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

const BlogIndex = ({ data, location }) => {
  const [theme, updateTheme] = useState('aqua');
  const handleChange = useMemo(() => (event) => {
    const { target: { value } = {} } = event || {};
    updateTheme(value);
  }, []);
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;
  return (
    <Layout location={location} title={siteTitle}>
      <ThemeWrapper
        s={Themes[theme]}
      >
        <SEO title="All posts" />
        <Bio />
        <Sidebar>
          <ThemePicker
            handleChange={handleChange}
          />
        </Sidebar>
        {posts.map(({ node }) => (
          <BlogPostCard
            title={{
              text: node.frontmatter.title || node.fields.slug,
              link: node.fields.slug,
            }}
            date={new Date(node.frontmatter.date)}
            description={node.frontmatter.description || node.excerpt}
          />
        ))}
      </ThemeWrapper>
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
