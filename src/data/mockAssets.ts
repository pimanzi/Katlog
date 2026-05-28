import type { Asset } from '@/types/asset.types'

export const mockAssets: Asset[] = [

  {
    id: "1",
    productId: "1",
    assetType: 'image',
    title: 'Nike Air Max 2026 Hero Shot',
    description: 'Main hero shot of Nike Air Max 2026 on white background for catalogue use.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    tags: ['hero', 'white-background', 'catalogue'],
    uploadedAt: '2026-01-16T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-16T10:00:00Z' },
      { status: 'approved', changedAt: '2026-01-17T09:00:00Z' }
    ]
  },
  {
    id: "2",
    productId: "1",
    assetType: 'image',
    title: 'Nike Air Max 2026 Lifestyle Shot',
    description: 'Lifestyle shot of Nike Air Max 2026 worn outdoors for social media use.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
    tags: ['lifestyle', 'outdoor', 'social-media'],
    uploadedAt: '2026-01-16T11:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-16T11:00:00Z' },
      { status: 'approved', changedAt: '2026-01-17T09:30:00Z' }
    ]
  },
  {
    id: "3",
    productId: "1",
    variantId: "1",
    assetType: 'image',
    title: 'Air Max Black EU40 Front View',
    description: 'Front view of Nike Air Max 2026 in Black colorway size EU 40.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
    tags: ['black', 'front-view', 'variant'],
    uploadedAt: '2026-01-17T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-17T10:00:00Z' },
      { status: 'approved', changedAt: '2026-01-18T09:00:00Z' }
    ]
  },
  {
    id: "4",
    productId: "1",
    variantId: "3",
    assetType: 'image',
    title: 'Air Max White EU40 Front View',
    description: 'Front view of Nike Air Max 2026 in White colorway size EU 40.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800',
    tags: ['white', 'front-view', 'variant'],
    uploadedAt: '2026-01-18T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-18T10:00:00Z' }
    ]
  },
  {
    id: "5",
    productId: "1",
    assetType: 'document',
    title: 'Nike Air Max 2026 Spec Sheet',
    description: 'Technical specification sheet including materials, dimensions and care instructions.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800',
    tags: ['spec-sheet', 'technical'],
    uploadedAt: '2026-01-16T12:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-16T12:00:00Z' },
      { status: 'approved', changedAt: '2026-01-17T10:00:00Z' }
    ]
  },

  {
    id: "6",
    productId: "2",
    assetType: 'image',
    title: 'Nike Dri-FIT Tee Hero Shot',
    description: 'Main product shot of Nike Dri-FIT Training Tee on white background.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    tags: ['hero', 'white-background'],
    uploadedAt: '2026-01-21T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-21T10:00:00Z' },
      { status: 'approved', changedAt: '2026-01-22T09:00:00Z' }
    ]
  },
  {
    id: "7",
    productId: "2",
    variantId: "6",
    assetType: 'image',
    title: 'Dri-FIT Black S Front View',
    description: 'Front view of Nike Dri-FIT Tee in Black size S.',
    status: 'rejected',
    url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
    tags: ['black', 'front-view'],
    rejectionReason: 'Image is blurry and does not meet quality standards.',
    uploadedAt: '2026-01-22T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-22T10:00:00Z' },
      {
        status: 'rejected',
        changedAt: '2026-01-23T09:00:00Z',
        reason: 'Image is blurry and does not meet quality standards.'
      }
    ]
  },
  {
    id: "8",
    productId: "2",
    variantId: "7",
    assetType: 'image',
    title: 'Dri-FIT Black M Front View',
    description: 'Front view of Nike Dri-FIT Tee in Black size M.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
    tags: ['black', 'front-view'],
    uploadedAt: '2026-01-22T11:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-22T11:00:00Z' },
      { status: 'approved', changedAt: '2026-01-23T10:00:00Z' }
    ]
  },

  
  {
    id: "9",
    productId: "3",
    assetType: 'image',
    title: 'Nike Pro Leggings Hero Shot',
    description: 'Main hero shot of Nike Pro Leggings on white background.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800',
    tags: ['hero', 'white-background'],
    uploadedAt: '2026-02-02T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-02T10:00:00Z' }
    ]
  },
  {
    id: "10",
    productId: "3",
    variantId: "10",
    assetType: 'image',
    title: 'Pro Leggings Black XS Side View',
    description: 'Side view of Nike Pro Leggings in Black size XS.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
    tags: ['black', 'side-view'],
    uploadedAt: '2026-02-03T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-03T10:00:00Z' }
    ]
  },


  {
    id: "11",
    productId: "4",
    assetType: 'image',
    title: 'Adidas Samba OG Hero Shot',
    description: 'Main hero shot of Adidas Samba OG on clean white background.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800',
    tags: ['hero', 'white-background', 'catalogue'],
    uploadedAt: '2026-01-26T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-26T10:00:00Z' },
      { status: 'approved', changedAt: '2026-01-27T09:00:00Z' }
    ]
  },
  {
    id: "12",
    productId: "4",
    variantId: "14",
    assetType: 'image',
    title: 'Samba White/Black EU39 Side View',
    description: 'Side view of Adidas Samba OG White/Black colorway size EU 39.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800',
    tags: ['white', 'side-view', 'variant'],
    uploadedAt: '2026-01-27T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-27T10:00:00Z' },
      { status: 'approved', changedAt: '2026-01-28T09:00:00Z' }
    ]
  },
  {
    id: "13",
    productId: "4",
    assetType: 'video',
    title: 'Adidas Samba OG Campaign Video',
    description: 'Short campaign video showcasing Samba OG in street style settings.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800',
    tags: ['campaign', 'video', 'street-style'],
    uploadedAt: '2026-01-28T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-28T10:00:00Z' }
    ]
  },

  
  {
    id: "14",
    productId: "5",
    assetType: 'image',
    title: 'Ultraboost 24 Hero Shot',
    description: 'Main hero shot of Adidas Ultraboost 24 highlighting Boost midsole.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
    tags: ['hero', 'boost', 'catalogue'],
    uploadedAt: '2026-01-11T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-11T10:00:00Z' },
      { status: 'approved', changedAt: '2026-01-12T09:00:00Z' }
    ]
  },
  {
    id: "15",
    productId: "5",
    variantId: "18",
    assetType: 'image',
    title: 'Ultraboost Black EU40 Top View',
    description: 'Top down view of Ultraboost 24 Core Black size EU 40.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800',
    tags: ['black', 'top-view', 'variant'],
    uploadedAt: '2026-01-12T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-12T10:00:00Z' },
      { status: 'approved', changedAt: '2026-01-13T09:00:00Z' }
    ]
  },

  {
    id: "16",
    productId: "6",
    assetType: 'image',
    title: 'Tiro Training Jacket Hero Shot',
    description: 'Main product shot of Adidas Tiro Training Jacket on white background.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
    tags: ['hero', 'jacket', 'sportswear'],
    uploadedAt: '2026-02-11T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-11T10:00:00Z' }
    ]
  },
  {
    id: "17",
    productId: "6",
    variantId: "21",
    assetType: 'image',
    title: 'Tiro Jacket Black S Front View',
    description: 'Front view of Adidas Tiro Jacket in Black size S.',
    status: 'rejected',
    url: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?w=800',
    tags: ['black', 'front-view'],
    rejectionReason: 'Background is not white, please reshoot on white background.',
    uploadedAt: '2026-02-12T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-12T10:00:00Z' },
      {
        status: 'rejected',
        changedAt: '2026-02-13T09:00:00Z',
        reason: 'Background is not white, please reshoot on white background.'
      }
    ]
  },


  {
    id: "18",
    productId: "7",
    assetType: 'image',
    title: 'Stan Smith Hero Shot',
    description: 'Classic hero shot of Adidas Stan Smith on white background.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800',
    tags: ['hero', 'classic', 'white-background'],
    uploadedAt: '2023-09-02T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2023-09-02T10:00:00Z' },
      { status: 'approved', changedAt: '2023-09-03T09:00:00Z' }
    ]
  },
  {
    id: "19",
    productId: "7",
    variantId: "24",
    assetType: 'image',
    title: 'Stan Smith White/Green EU39',
    description: 'Side view of Adidas Stan Smith White/Green colorway size EU 39.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800',
    tags: ['white-green', 'side-view'],
    uploadedAt: '2023-09-03T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2023-09-03T10:00:00Z' },
      { status: 'approved', changedAt: '2023-09-04T09:00:00Z' }
    ]
  },


  {
    id: "20",
    productId: "8",
    assetType: 'image',
    title: 'Zara Floral Dress Hero Shot',
    description: 'Main hero shot of Zara Summer Floral Dress on white background.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
    tags: ['hero', 'dress', 'summer'],
    uploadedAt: '2026-02-06T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-06T10:00:00Z' },
      { status: 'approved', changedAt: '2026-02-07T09:00:00Z' }
    ]
  },
  {
    id: "21",
    productId: "8",
    variantId: "27",
    assetType: 'image',
    title: 'Floral Dress Blue Print XS',
    description: 'Full length shot of Zara Floral Dress in Blue Print size XS.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    tags: ['blue', 'full-length', 'variant'],
    uploadedAt: '2026-02-07T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-07T10:00:00Z' },
      { status: 'approved', changedAt: '2026-02-08T09:00:00Z' }
    ]
  },
  {
    id: "22",
    productId: "8",
    variantId: "29",
    assetType: 'image',
    title: 'Floral Dress Pink Print S',
    description: 'Full length shot of Zara Floral Dress in Pink Print size S.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800',
    tags: ['pink', 'full-length', 'variant'],
    uploadedAt: '2026-02-08T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-08T10:00:00Z' }
    ]
  },


  {
    id: "23",
    productId: "9",
    assetType: 'image',
    title: 'Zara Leather Bag Hero Shot',
    description: 'Main hero shot of Zara Leather Shoulder Bag on white background.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
    tags: ['hero', 'bag', 'leather'],
    uploadedAt: '2026-03-02T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-03-02T10:00:00Z' }
    ]
  },


  {
    id: "24",
    productId: "11",
    assetType: 'image',
    title: 'Zara Silk Scarf Hero Shot',
    description: 'Flat lay hero shot of Zara Silk Scarf showing full print detail.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
    tags: ['hero', 'flat-lay', 'scarf'],
    uploadedAt: '2026-02-21T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-21T10:00:00Z' }
    ]
  },
  {
    id: "25",
    productId: "11",
    variantId: "33",
    assetType: 'image',
    title: 'Silk Scarf Ivory Close Up',
    description: 'Close up of Zara Silk Scarf in Ivory showing texture and print.',
    status: 'rejected',
    url: 'https://images.unsplash.com/photo-1520903920263-00d872a2d1c9?w=800',
    tags: ['ivory', 'close-up'],
    rejectionReason: 'Image is overexposed, colors are washed out.',
    uploadedAt: '2026-02-22T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-22T10:00:00Z' },
      {
        status: 'rejected',
        changedAt: '2026-02-23T09:00:00Z',
        reason: 'Image is overexposed, colors are washed out.'
      }
    ]
  },


  {
    id: "26",
    productId: "12",
    assetType: 'image',
    title: 'Gucci Horsebit Loafer Hero Shot',
    description: 'Luxury hero shot of Gucci Horsebit Loafer highlighting gold hardware.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1573100925118-870b8efc799d?w=800',
    tags: ['hero', 'luxury', 'catalogue'],
    uploadedAt: '2026-01-21T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-21T10:00:00Z' },
      { status: 'approved', changedAt: '2026-01-22T09:00:00Z' }
    ]
  },
  {
    id: "27",
    productId: "12",
    variantId: "36",
    assetType: 'image',
    title: 'Horsebit Loafer Black EU36',
    description: 'Side view of Gucci Horsebit Loafer in Black size EU 36.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
    tags: ['black', 'side-view', 'variant'],
    uploadedAt: '2026-01-22T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-22T10:00:00Z' },
      { status: 'approved', changedAt: '2026-01-23T09:00:00Z' }
    ]
  },
  {
    id: "28",
    productId: "12",
    assetType: 'document',
    title: 'Gucci Horsebit Loafer Care Guide',
    description: 'Official care and maintenance guide for Gucci Horsebit Loafer.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800',
    tags: ['care-guide', 'document'],
    uploadedAt: '2026-01-22T11:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-22T11:00:00Z' },
      { status: 'approved', changedAt: '2026-01-23T10:00:00Z' }
    ]
  },

  {
    id: "29",
    productId: "14",
    assetType: 'image',
    title: 'Gucci Ace Sneaker Hero Shot',
    description: 'Main hero shot of Gucci Ace Sneaker highlighting embroidered detail.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800',
    tags: ['hero', 'luxury', 'sneaker'],
    uploadedAt: '2026-02-16T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-16T10:00:00Z' }
    ]
  },
  {
    id: "30",
    productId: "14",
    variantId: "39",
    assetType: 'image',
    title: 'Ace Sneaker White EU39 Side View',
    description: 'Side view of Gucci Ace Sneaker in White size EU 39.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=800',
    tags: ['white', 'side-view', 'variant'],
    uploadedAt: '2026-02-17T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-17T10:00:00Z' }
    ]
  },

  {
    id: "31",
    productId: "15",
    assetType: 'image',
    title: 'Gucci Bamboo Mini Bag Hero Shot',
    description: 'Luxury hero shot of Gucci Bamboo Mini Bag highlighting bamboo handle.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
    tags: ['hero', 'luxury', 'bag'],
    uploadedAt: '2023-10-02T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2023-10-02T10:00:00Z' },
      { status: 'approved', changedAt: '2023-10-03T09:00:00Z' }
    ]
  },
  {
    id: "32",
    productId: "15",
    variantId: "42",
    assetType: 'image',
    title: 'Bamboo Mini Bag Black Close Up',
    description: 'Close up of Gucci Bamboo Mini Bag in Black showing bamboo handle detail.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800',
    tags: ['black', 'close-up', 'variant'],
    uploadedAt: '2023-10-03T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2023-10-03T10:00:00Z' },
      { status: 'approved', changedAt: '2023-10-04T09:00:00Z' }
    ]
  },

  {
    id: "33",
    productId: "16",
    assetType: 'image',
    title: 'J&J Slim Fit Jeans Hero Shot',
    description: 'Main hero shot of Jack&Jones Slim Fit Jeans on white background.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
    tags: ['hero', 'jeans', 'white-background'],
    uploadedAt: '2026-01-31T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-01-31T10:00:00Z' },
      { status: 'approved', changedAt: '2026-02-01T09:00:00Z' }
    ]
  },
  {
    id: "34",
    productId: "16",
    variantId: "44",
    assetType: 'image',
    title: 'Slim Fit Jeans Dark Blue 30x30',
    description: 'Front view of J&J Slim Fit Jeans in Dark Blue size 30x30.',
    status: 'approved',
    url: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800',
    tags: ['dark-blue', 'front-view', 'variant'],
    uploadedAt: '2026-02-01T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-01T10:00:00Z' },
      { status: 'approved', changedAt: '2026-02-02T09:00:00Z' }
    ]
  },

  {
    id: "35",
    productId: "17",
    assetType: 'image',
    title: 'J&J Casual Blazer Hero Shot',
    description: 'Main hero shot of Jack&Jones Casual Blazer on white background.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800',
    tags: ['hero', 'blazer', 'white-background'],
    uploadedAt: '2026-03-06T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-03-06T10:00:00Z' }
    ]
  },

  {
    id: "36",
    productId: "18",
    assetType: 'image',
    title: 'J&J Knit Hoodie Hero Shot',
    description: 'Main hero shot of Jack&Jones Knit Hoodie on white background.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
    tags: ['hero', 'hoodie', 'white-background'],
    uploadedAt: '2026-02-26T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-26T10:00:00Z' }
    ]
  },
  {
    id: "37",
    productId: "18",
    variantId: "49",
    assetType: 'image',
    title: 'Knit Hoodie Grey Marl S Front View',
    description: 'Front view of J&J Knit Hoodie in Grey Marl size S.',
    status: 'pending_review',
    url: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800',
    tags: ['grey', 'front-view', 'variant'],
    uploadedAt: '2026-02-27T10:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-27T10:00:00Z' }
    ]
  },
  {
    id: "38",
    productId: "18",
    variantId: "51",
    assetType: 'image',
    title: 'Knit Hoodie Black M Front View',
    description: 'Front view of J&J Knit Hoodie in Black size M.',
    status: 'rejected',
    url: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800',
    tags: ['black', 'front-view', 'variant'],
    rejectionReason: 'Poor lighting, product details not visible.',
    uploadedAt: '2026-02-27T11:00:00Z',
    statusHistory: [
      { status: 'pending_review', changedAt: '2026-02-27T11:00:00Z' },
      {
        status: 'rejected',
        changedAt: '2026-02-28T09:00:00Z',
        reason: 'Poor lighting, product details not visible.'
      }
    ]
  }
]
