import { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState([]);
  const [selectedVideo, setselectedVideo] = useState(null);

  const selectVideo = (video) => {
    setselectedVideo(video)
  }
  const search = useCallback((query) => {
    setselectedVideo(null);
    youtube.search(query)
     .then(videos => {setVideos(videos);});
  }, [youtube]);

  useEffect(()=> {
    console.log('useEffect');
    youtube
      .mostPopular()
      .then(result => setVideos(result))
      .catch(error => {
        if(error.code==403) setError('403');
      });
  }, [youtube]);

  return (
    <div className={styles.app}>
      {error == 403 ? '오늘 Youtube APi 요청 횟수가 초과되었습니다😥': 
      <>
        <SearchHeader 
          onSearch={search}
          setselectedVideo={setselectedVideo}
        />
        <section className={styles.content}>
          {selectedVideo && (
            <div className={styles.detail}>
              <VideoDetail video={selectedVideo} />
            </div>)
          }
          <div className={styles.list}>
            <VideoList
              videos={videos}
              onVideoClick={selectVideo}
              display={selectedVideo ? 'list' : 'grid'}
            />
          </div>
        </section>
      </>
      }
    </div>
  );
}

export default App;
