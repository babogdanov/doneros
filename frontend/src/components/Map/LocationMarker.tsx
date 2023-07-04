import { useEffect, useState } from 'react'
import { Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
})

type LocationMarkerProps = {
  location?: {
    latitude: number
    longitude: number
  }
  controlled?: boolean
}

const LocationMarker = ({ location, controlled }: LocationMarkerProps) => {
  const [position, setPosition] = useState<L.LatLng | L.LatLngTuple | null>(null)
  const [bbox, setBbox] = useState<string | string[]>([])

  const map = useMap()

  useEffect(() => {
    if (!controlled) {
      map.locate().on('locationfound', function (e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        const radius = e.accuracy
        const circle = L.circle(e.latlng, radius)
        circle.addTo(map)
        setBbox(e.bounds.toBBoxString().split(','))
      })
    } else if (location) {
      const latlng: L.LatLngTuple = [location.latitude - 0.01, location.longitude - 0.01]
      setPosition(latlng)
      map.flyTo(latlng, map.getZoom())
    }
  }, [map, location, controlled])

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>{controlled ? 'You are here.' : 'Courier is here.'}</Popup>
    </Marker>
  )
}

export default LocationMarker
