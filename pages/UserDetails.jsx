const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

import { userService } from '../services/user.service.js'
import { updateUser } from '../store/actions/user.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function UserDetails() {
  const { userId } = useParams()

  const [user, setUser] = useState(null)
  const [fullname, setFullname] = useState('')
  const [color, setColor] = useState('#ffffff')
  const [bgColor, setBgColor] = useState('#000000')

  useEffect(() => {
    userService.getById(userId).then((fetchedUser) => {
      setUser(fetchedUser)
      setFullname(fetchedUser.fullname)
      setColor(fetchedUser.color || '#ffffff')
      setBgColor(fetchedUser.bgColor || '#000000')
    })
  }, [userId])

  function onSave(ev) {
    ev.preventDefault()

    const updatedUser = {
      ...user,
      fullname,
      color,
      bgColor,
      updatedAt: Date.now(),
    }

    updateUser(updatedUser)
      .then(() => {
        showSuccessMsg('Preferences saved!')
      })
      .catch(() => {
        showErrorMsg('Failed to save preferences')
      })
  }

  function getTimeAgo(timestamp) {
    const diff = Date.now() - timestamp
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    return `just now`
  }

  if (!user) return <div>Loading user...</div>

  return (
    <section className='user-details'>
      <h2>User Details</h2>

      <form onSubmit={onSave}>
        <div>
          <label>Full Name:</label>
          <input type='text' value={fullname} onChange={(ev) => setFullname(ev.target.value)} />
        </div>

        <div>
          <label>Preferred Text Color:</label>
          <input type='color' value={color} onChange={(ev) => setColor(ev.target.value)} />
        </div>

        <div>
          <label>Preferred Background Color:</label>
          <input type='color' value={bgColor} onChange={(ev) => setBgColor(ev.target.value)} />
        </div>

        <button>Save</button>
      </form>

      {user.activities.length > 0 && (
        <div className='activity-log'>
          <h3>Activity Log</h3>
          <ul>
            {user.activities.map((activity, idx) => (
              <li key={idx}>
                🕒 {getTimeAgo(activity.at)} — {activity.txt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
