import Carousel from 'react-material-ui-carousel'
import ImageCard from './ImageCard'

export default function ImageCarousel({ images }) {
    return (
        <div className="flex w-80 flex-col">
            <Carousel autoPlay={false} 
                      animation={"slide"}
                      className="flex-col" navButtonsAlwaysVisible={true}
                      fullHeightHover={false} 
                        navButtonsProps={{
                            style: {
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '50%',
                            color: 'black',
                            width:'30px',
                            height:'30px'
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