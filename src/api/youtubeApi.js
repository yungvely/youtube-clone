class YoutubeClass {
    constructor(httpClient){
        this.youtube = httpClient;
    }

    async search(query) {
        const response = await this.youtube.get('search',{
            params: {
              part: 'snippet',
              maxResults: 25,
              type: 'video',
              q: query,
            }
          });
          return response.data.items.map(item => ({ ...item, id: item.id.videoId }));

        // const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=AIzaSyAlVHqZOy7sSP3rgPLqdyKgvqze8J4gaR4`,
        //     this.getRequestOptions
        // );
        // const result = await response.json();
        // return result.items.map(item => ({ ...item, id: item.id.videoId }));
    }
    
    async mostPopular() {
        const response = await this.youtube.get('videos',{
            params: {
              part: 'snippet',
              chart: 'mostPopular',
              maxResults: 25,
            }
          });
        return response.data.items; //onst result = await response.json();

        // const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
        //     this.getRequestOptions
        // );
        // const result = await response.json();
        // return result.items;
    }
    
    // search(query) {
    //     return fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=AIzaSyAlVHqZOy7sSP3rgPLqdyKgvqze8J4gaR4`
    //         ,this.getRequestOptions
    //     )
    //         .then(response => response.json())
    //         .then(result => result.items.map( item =>({ ...item, id: item.id.videoId })))
    // }
    
    // mostPopular() {
    //     return fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${this.key}`,
    //         this.getRequestOptions
    //     )
    //         .then(response => response.json())
    //         .then(result => result.items)
    // }
}

export default YoutubeClass;