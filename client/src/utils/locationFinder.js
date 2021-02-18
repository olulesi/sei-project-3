// import React from 'react'
// import { getPostcodeData } from '../lib/api'

// export default function locationFinder(postcode) {

//   const [longLat, setLongLat] = React.useState({
//     longitude: '',
//     latitude: ''
//   })
  
//   React.useEffect(() => {
//     const getLongLat = async (postcode) => {
//       try {
//         const { data } = await getPostcodeData(postcode)
//         setLongLat({
//           longitude: data.result.longitude,
//           latitude: data.result.latitude
//         })
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getLongLat({ postcode })
//   }, [])
  
//   console.log(longLat)

//   return (
//     longLat
//   )
// }