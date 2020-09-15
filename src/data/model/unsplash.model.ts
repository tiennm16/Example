export interface UnsplashPhoto {
  id: string;
  description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: UnsplashUser;
}

export interface UnsplashUser {
  id: string;
  name: string;
  username: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}
