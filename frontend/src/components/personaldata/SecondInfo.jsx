import React from 'react'

const SecondInfo = ({formData, setFormData}) => {
  return (
    <div>
        <div  className='form-group'>
        <label htmlFor="Bio">Occupation</label>
        <input
        type="text"
        placeholder="What do you do...?"
        className='form-control my-2'
        value={formData.occupation}
        onChange={(event) =>
          setFormData({ ...formData, occupation: event.target.value })
        }
      />
    </div>
    <div className="form-group">
        <label htmlFor="Bio">Bio</label>
        <textarea 
            className="form-control" 
            id="bio" rows="3" 
            value={formData.bio} 
            onChange={(event)=> setFormData({ ...formData, bio: event.target.value }) }></textarea>
    </div>
    </div>
  )
}

export default SecondInfo