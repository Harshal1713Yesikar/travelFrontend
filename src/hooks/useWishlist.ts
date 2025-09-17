import { useState, useEffect } from 'react'

export interface WishlistItem {
  id: string
  name: string
  image: string
  price: number
  rating: number
  type: 'hotel' | 'destination' | 'package'
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem('travel-wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  const addToWishlist = (item: WishlistItem) => {
    const newWishlist = [...wishlist, item]
    setWishlist(newWishlist)
    localStorage.setItem('travel-wishlist', JSON.stringify(newWishlist))
  }

  const removeFromWishlist = (id: string) => {
    const newWishlist = wishlist.filter(item => item.id !== id)
    setWishlist(newWishlist)
    localStorage.setItem('travel-wishlist', JSON.stringify(newWishlist))
  }

  const isInWishlist = (id: string) => {
    return wishlist.some(item => item.id === id)
  }

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist }
}