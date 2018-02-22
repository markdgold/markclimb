export interface Iinstapost {
  attribution: any,
  caption: {
    created_time: string,
    from: {
      full_name: string,
      id: string,
      profile_picture: string,
      username: string
    },
    id: string,
    text: string
  },
  comments: {
    count: number,
  },
  created_time: string,
  filter: string,
  id: string,
  images: {
    low_resoultion: {
      height: number,
      url: string,
      width: number
    },
    standard_resoultion: {
      height: number,
      url: string,
      width: number
    },
    thumbnail: {
      height: number,
      url: string,
      width: number
    },
  },
  likes: {
    count: number
  },
  link: string,
  location: {
    id: number
    latitude: number,
    longitude: number,
    name: string,
  },
  tags: string[],
  type: string,
  user: {
    full_name: string,
    id: string,
    profile_picture: string,
    username: string
  },
  user_has_liked: boolean,
  videos?: {
    low_bandwidth: {
      height: number,
      id: string,
      url: string,
      width: number
    },
    low_resolution: {
      height: number,
      id: string,
      url: string,
      width: number
    },
    standard_resolution: {
      height: number,
      id: string,
      url: string,
      width: number
    },
  },
}
