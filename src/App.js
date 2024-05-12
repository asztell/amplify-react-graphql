import { useState } from 'react'
import { post, get } from 'aws-amplify/api'
import './App.css'

async function postBlog(id) {
  try {
    const restOperation = post({
      apiName: 'blogApi',
      path: `/blog/${id}`,
      options: {
        body: {
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
      }
    })

    const { body } = await restOperation.response
    const response = await body.json()

    console.log('POST call succeeded')
    console.log(response)
  } catch (e) {
    console.log('POST call failed: ', JSON.parse(e.response.body))
  }
}
async function getBlog(id) {
  try {
    const restOperation = get({
      apiName: 'blogApi',
      path: `/blog/${id}`,
      options: {
        queryParams: {
          id
        }
      }
    })

    const { body } = await restOperation.response
    const response = await body.json()

    console.log('POST call succeeded')
    console.log(response)
  } catch (e) {
    console.log('POST call failed: ', JSON.parse(e.response.body))
  }
}

function App() {
  const [blogId, setBlogId] = useState('')
  return (
    <div className="App">
      <button onClick={() => postBlog(Math.round(Math.random() * 100))}>
        Post Blog
      </button>
      <input type="text" onChange={({ target }) => setBlogId(target.value)} />
      <button onClick={() => getBlog(blogId)}>Get Blog</button>
    </div>
  )
}

export default App
