import { Route } from 'react-router-dom';
import { Authentication } from '../components/router';
import {
  VideoService,
  VideoServiceBangumiCreate,
  VideoServiceBangumiDetails,
  VideoServiceBangumiPlay,
  VideoServiceBangumiTable,
  VideoServiceBangumiUpdate,
  VideoServiceChannelCreate,
  VideoServiceChannelDetails,
  VideoServiceChannelList,
  VideoServiceChannelUpdate,
  VideoServiceEpisodeCreate,
  VideoServiceEpisodeTable,
  VideoServiceHome,
  VideoServiceItemPlay,
  VideoServiceItemTable,
  VideoServiceItemUpdate,
  VideoServiceItemUpload,
  VideoSeriesCreate,
  VideoSeriesDetails,
  VideoSeriesTable,
  VideoSeriesUpdate,
  VideoServiceSettings,
  VideoServiceSourceCreate,
  VideoServiceSourceList,
  VideoServiceSourceUpdate,
} from "../pages/video";

const VideoServiceRoutes = (
  <Route path={"video"} element={<VideoService />}>
    <Route index element={<Authentication><VideoServiceHome /></Authentication>} />
    {/** bangumi */}
    <Route path='/video/bangumi/edit' element={<Authentication><VideoServiceBangumiCreate /></Authentication>} />
    <Route path='/video/bangumi/details/:id' element={<Authentication><VideoServiceBangumiDetails /></Authentication>} />
    <Route path='/video/bangumi/play/:episodeId' element={<Authentication><VideoServiceBangumiPlay /></Authentication>} />
    <Route path='/video/bangumi/list' element={<Authentication><VideoServiceBangumiTable /></Authentication>} />
    <Route path='/video/bangumi/edit/:id' element={<Authentication><VideoServiceBangumiUpdate /></Authentication>} />
    {/** channel */}
    <Route path='/video/channel/edit' element={<Authentication><VideoServiceChannelCreate /></Authentication>} />
    <Route path='/video/channel/details/:id' element={<Authentication><VideoServiceChannelDetails /></Authentication>} />
    <Route path='/video/channel/list' element={<Authentication><VideoServiceChannelList /></Authentication>} />
    <Route path='/video/channel/edit/:id' element={<Authentication><VideoServiceChannelUpdate /></Authentication>} />
    {/** episode */}
    <Route path='/video/episode/edit' element={<Authentication><VideoServiceEpisodeCreate /></Authentication>} />
    <Route path='/video/episode/list' element={<Authentication><VideoServiceEpisodeTable /></Authentication>} />
    {/** item */}
    <Route path='/video/item/play/:id' element={<Authentication><VideoServiceItemPlay /></Authentication>} />
    <Route path='/video/item/list' element={<Authentication><VideoServiceItemTable /></Authentication>} />
    <Route path='/video/item/edit/:id' element={<Authentication><VideoServiceItemUpdate /></Authentication>} />
    <Route path='/video/item/upload' element={<Authentication><VideoServiceItemUpload /></Authentication>} />
    {/** series */}
    <Route path='/video/series/edit' element={<Authentication><VideoSeriesCreate /></Authentication>} />
    <Route path='/video/series/details/:id' element={<Authentication><VideoSeriesDetails /></Authentication>} />
    <Route path='/video/series/list' element={<Authentication><VideoSeriesTable /></Authentication>} />
    <Route path='/video/series/edit/:id' element={<Authentication><VideoSeriesUpdate /></Authentication>} />
    {/** source */}
    <Route path='/video/source/edit' element={<Authentication><VideoServiceSourceCreate /></Authentication>} />
    <Route path='/video/source/list' element={<Authentication><VideoServiceSourceList /></Authentication>} />
    <Route path='/video/source/edit/:id' element={<Authentication><VideoServiceSourceUpdate /></Authentication>} />
    {/** settings */}
    <Route path='/video/settings' element={<Authentication><VideoServiceSettings /></Authentication>} />
  </Route>
);

export default VideoServiceRoutes;