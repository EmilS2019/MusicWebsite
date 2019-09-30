import React, { useState, useEffect } from 'react'
import BlogLink from './BlogLink'
import Axios from 'axios'

export default function Blogs() {
	const [blogList, setBlogList] = useState([])
	let allBlogs = []

	const getBlogs = async () => {
		const { data } = await Axios.get('/api/blogs').catch(e => console.error(e))
		allBlogs = data
		document.querySelector('.loading').setAttribute('style', 'display:none;')
		sortByTag('')
	}

	useEffect(() => {
		getBlogs()
		SetLinksToTags()
	}, [])

	//Gives function to the list underneath "Categories" in the aside
	const SetLinksToTags = () => {
		const tags = document.querySelector('.sidebar ul')
		for (let i = 0; i < tags.children.length; i++) {
			const li = tags.children[i]

			li.addEventListener('click', () => {
				for (let i = 0; i < tags.children.length; i++) {
					tags.children[i].classList.remove('selectedTag')
				}

				li.classList.toggle('selectedTag')
				if (i === 0) sortByTag('')
				else sortByTag(li.innerText)
			})
		}
	}

	const sortByTag = tag => {
		if (tag === '')
			setBlogList(
				allBlogs.map(blog => <BlogLink key={blog.url} blog={blog} classes='blogLink' />)
			)
		else {
			const a = allBlogs.filter(blog => blog.tags.includes(tag))
			setBlogList(
				a.map(blog => <BlogLink key={blog.url} blog={blog} classes='blogLink' />)
			)
		}
	}

	return (
		<div className='Blogs'>
			<aside className='sidebar'>
				<h2>Categories</h2>
				<ul>
					<li>All</li>
					<li>Plugins</li>
					<li>Industry</li>
					<li>Money</li>
					<li>Other</li>
				</ul>
			</aside>
			<div className='blogList'>{blogList}</div>
			<div className='loading'></div>
		</div>
	)
}
