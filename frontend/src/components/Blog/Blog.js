import React, { useState, useEffect } from 'react'
import Axios from 'axios'

export default function Blogs() {
	const [blog, setBlog] = useState({})
	const getBlog = async () => {
		const blogURL = window.location.pathname.split('/')[2]
		const { data } = await Axios.get(`/api/blogs/${blogURL}`)
		setBlog(data)
		document.querySelector('.loading').setAttribute('style', 'display:none;')
	}
	useEffect(() => {
		getBlog()
	}, [])

	return (
		<article className='BlogPost'>
			<div className='loading'></div>
			<h1>{blog.title}</h1>
			<h2 className='tags'>{blog.tags}</h2>
			<h2 className='description'>{blog.description}</h2>
			<div dangerouslySetInnerHTML={{ __html: blog.text }}></div>
		</article>
	)
}
