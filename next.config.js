module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/repos',
        permanent: true,
      },
    ]
  },
}
