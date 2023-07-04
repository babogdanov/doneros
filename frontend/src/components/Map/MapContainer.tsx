import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from './LocationMarker'
import 'leaflet/dist/leaflet.css'

type MapLayoutProps = {
  location?: {
    latitude: number
    longitude: number
  }
}

const MapLayout = ({ location }: MapLayoutProps) => {
  return (
    <div className='h-1/2 w-1/2'>
      <MapContainer
        center={[49.1951, 16.6068]}
        zoom={13}
        scrollWheelZoom
        style={{ height: '100vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <LocationMarker location={location} controlled />
        <LocationMarker />
      </MapContainer>
    </div>
  )
}

export default MapLayout
