import Carousel from 'react-material-ui-carousel'
import ImageCard from './ImageCard'

export default function ImageCarousel({ images }) {
    return (
        <div className="flex w-80 flex-col">
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
                {Object.entries(images).map(([key, value], index) => {
                    return <ImageCard key={index} description={key} img={value} />
                })}
            </Carousel>
        </div>
    )
}