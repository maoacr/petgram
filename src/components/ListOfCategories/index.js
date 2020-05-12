import React, { Fragment, useEffect, useState } from 'react'
import { Category } from '../Category'

import { List, Item } from './styles'


// C U S T O M   H O O K

function useCategoriesData() {
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(function () {
		setLoading(true)
	    window.fetch('https://petgram-gcidq6kty.now.sh/categories')
	      .then(res => res.json())
	      .then(response => {
	        setCategories(response)
	        setLoading(false)
      })
  }, [])

	return { categories, loading }
}

export const ListOfCategories = () => {

	const { categories, loading } = useCategoriesData()
	const [showFixed, setShowFixed] = useState(false)

  useEffect(function () {
    const onScroll = e => {
      const newShowFixed = window.scrollY > 200
      showFixed !== newShowFixed && setShowFixed(newShowFixed)
    }

    document.addEventListener('scroll', onScroll)

    return () => document.removeEventListener('scroll', onScroll)
  }, [showFixed])

  const renderList = (fixed) => (
    <List fixed={ fixed } >
      {
        categories.map(category => <Item key={category.id}><Category {...category} /></Item>)
      }
    </List>
  )

  if (loading) {
  	return 'Cargando...'
  }

  return (
    <Fragment>
      {renderList()}
      {showFixed && renderList(true)}
    </Fragment>
  )
}