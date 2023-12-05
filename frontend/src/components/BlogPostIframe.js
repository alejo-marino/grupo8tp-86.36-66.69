import React from 'react'
import { environment } from '../environments/environment'

const BlogPostIframe = () => {
  return <iframe src={environment.iframeUrl} class="iframe"></iframe>
}

export default BlogPostIframe
