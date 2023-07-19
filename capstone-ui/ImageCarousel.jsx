import Carousel from 'react-material-ui-carousel'
import ImageCard from './ImageCard'

export default function ImageCarousel() {
    return (
        <div className="flex w-60 flex-col">
            <Carousel className="flex-col" navButtonsAlwaysVisible={true}
            fullHeightHover={false} 
                      navButtonsProps={{
                        style: {
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          color: 'black'
                        }
                      }}
                      indicatorIconButtonProps={{
                        style: {
                            borderRadius: '10px',
                            height: '4px',
                            color: 'transparent',
                            width: '25px',
                            marginLeft: '10px',
                            marginRight: '10px',
                            border: '1px solid #3B82F6'
                        }
                    }}
                    activeIndicatorIconButtonProps={{
                        style: {
                            backgroundColor: '#3B82F6'
                        }
                    }}
                    >
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
            </Carousel>
        </div>
    )
}