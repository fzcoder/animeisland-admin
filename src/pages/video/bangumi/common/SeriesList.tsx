import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./styles/series-list.css";
type SeriesItemProps = Record<string, any>;

const SeriesItem: React.FC<SeriesItemProps & { currentBangumiId: string }> = ({name, bangumiId, currentBangumiId}) => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div
      className={
        bangumiId === currentBangumiId ? 
        'app-video-bangumi-common-series-item-current' : 
        'app-video-bangumi-common-series-item'
      }
      onClick={() => navigate(`/video/bangumi/details/${bangumiId}`)}
    >
      <span>{name || '未知系列'}</span>
    </div>
  )
}
export declare type SeriesListProps = {
  currentBangumiId?: string,
  series?: SeriesItemProps[],
}
const SeriesList: React.FC<SeriesListProps> = ({ series, currentBangumiId }) => {
  return (
    series.length > 0 ? (
      <div className='app-video-bangumi-common-series-list'>
        <div className='app-video-bangumi-common-series-list-header'>
          <span style={{ fontWeight: 'bold', fontSize: '14pt', marginBottom: '24px' }}>系列</span>
        </div>
        <div className='app-video-bangumi-common-series-list-main'>
          {
            series.map(value => (
              <SeriesItem key={value.id} currentBangumiId={currentBangumiId} {...value} />
            ))
          }
        </div>
      </div>
    ) :
    <></>
  )
}

export default SeriesList;