import LazyThumbnails from './LazyThumbnails';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Uploadbar from './Uploadbar';

export default function ThumbRend({ photos }) {

    return (
        <div className='row m-0'>
            <Uploadbar />
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 3, 750: 4, 900: 5, 1200: 6 }}>
                <Masonry gutter="5px">
                    {photos.map((photo) => {
                        return <LazyThumbnails {...{ photo }} key={photo.id} />
                    })}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    )
}