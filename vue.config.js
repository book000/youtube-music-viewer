module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/youtube-music-viewer/' : '/',
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'youtube-music-viewer',
    },
  },
}
