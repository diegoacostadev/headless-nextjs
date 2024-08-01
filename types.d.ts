import type { Document } from '@contentful/rich-text-types'

export type HeroQuery = {
  heroCollection: {
    items: {
      title: string
      eyebrow: string
      description: string
      ctasCollection: {
        items: {
          link: string
          label: string
        }[]
      }
    }[]
  }
}

export type ClientImagesQuery = {
  assetCollection: {
    items: {
      title: string
      url: string
      width: number
      height: number
    }[]
  }
}

export type MainNavigationQuery = {
  navigationCollection: {
    items: {
      name: string
      linksCollection: {
        items: {
          link: string
          label: string
        }[]
      }
    }[]
  }
}

export type CustomerPostQuery = {
  customerPostCollection: {
    items: {
      title: string
      slug: string
      customer: {
        name: string
        logo: {
          title: string
          url: string
          height: number
          width: number
        }
      }
      body: {
        json: Document
      }
    }[]
  }
}
