const API_KEY = "AIzaSyCX5YpUxUVNmRJUZrPk547MUXWMpTT43VA";

import React, {Component} from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';


// component imports
import SearchBar from "./components/search_bar";
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// create a new component which produces html
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videos : [] ,
      selectedVideo: null
    };

    this.videoSearch('john oliver');
  }

  videoSearch(term) {
    YTSearch({key:API_KEY, term: term}, (videos) => {
      //  {videos}  means  {videos:  videos }
      this.setState({
        videos: videos,
        selectedVideo : videos[0]
       });
    });
  }

  render() {

    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)

    return (
      <div>
        <SearchBar onSearchTermChange = {videoSearch}/>
        <VideoDetail video = {this.state.selectedVideo}/>
        <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
     </div>
      );
  }
}

// Take this component's html and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
