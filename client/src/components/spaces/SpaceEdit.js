import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleSpace, editSpace } from '../lib/api'
import useForm from '../../utils/useForm'
import { getLongLatData } from '../lib/api'
import { Container } from 'semantic-ui-react'
// import { getPostcodeData }from '../lib/api'

import SpaceForm from './SpaceForm'

async function getLongLat(postcode) {
  const { data } = await getLongLatData(postcode)
  return {
    longitude: data.result.longitude,
    latitude: data.result.latitude
  }
}

// async function getPostcode(longitude, latitude) {
//   const { data } = await getPostcodeData(longitude, latitude)
//   return {
//     longitude: data.result.longitude,
//     latitude: data.result.latitude
//   }
// }

function SpaceEdit() {

  const history = useHistory()
  const { id } = useParams()
  const { formdata, errors, handleChange, setFormdata, setErrors } = useForm({
    name: '',
    description: '',
    image: '',
    location: '',
    tags: []
  })

  //* We are currently adding in an empty string for Postcode when loading the Edit page

  //* Ideally we would do a GET request on pageload for the postcode, entering the Long/Lat which I have started to set up

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleSpace(id)
      const updatedData = { ...data, location: '' }
      setFormdata(updatedData)
    }
    getData()
  }, [id, setFormdata])


  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const longLat = await getLongLat(formdata.location)
      const newSpace = { ...formdata, location: longLat }
      console.log(newSpace)
      await editSpace(id, newSpace)
      history.push(`/spaces/${id}`)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }

  return (
    <Container>
      <section className="new-space-form-container">
        <h1>Edit your Space</h1>
        <div className="form-box">
          <SpaceForm
            formdata={formdata}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText="Edit your Space!"
          />
          <div>
            {!errors ?
              <div className="ui error message small">
                <div className="header">Sorry, some information is incorrect.</div>
              </div>
              :
              <p></p>
            }
          </div>
        </div>
      </section>
    </Container>
  )
}

export default SpaceEdit