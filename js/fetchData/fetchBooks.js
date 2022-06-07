class FetchBooks {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
  }

  async getBooks() {
    try {
      const response = await fetch(this.url, this.options);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const books = await response.json();
      return books;
    } catch {
      throw new Error("Something went wrong!");
    }
  }
}

export default FetchBooks;