module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/reading-materials',
        destination: 'http://localhost:8080/reading-materials',
      },
    ];
  },
};